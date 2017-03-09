import { AppStateService } from './AppState.provider';
import Activity from '../interfaces/Activity';
import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import config from '../config';

const activitiesRoute = config.activitiesRoute;

@Injectable()
export class ActivityService {

  constructor(private http: Http, private appStateService: AppStateService) { }

  getAll() {
    let observable = this.http.get(activitiesRoute)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      results => {
        this.appStateService.updateState({ activities: [...results] });
      },
      error => this.handleError);
    return observable;
  }

  create(activity: Activity) {
    let observable = this.http.post(activitiesRoute, activity)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      result => {
        let currentState = this.appStateService.getStateCopy();
        let updatedActivities = [...currentState.activities, result];
        this.appStateService.updateState({ activities: updatedActivities });
      },
      error => this.handleError);
  }

  update(activity: Activity) {
    let observable = this.http.put(`${activitiesRoute}${activity.id}`, activity)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      result => {
        let currentState = this.appStateService.getStateCopy();
        let updatedActivities = currentState.activities.map((a) => {
          if (a.id !== result.id) return a;
          return Object.assign({}, result);
        });
        this.appStateService.updateState({ activities: updatedActivities });
      },
      error => this.handleError);
  }

  delete(activity: Activity) {
    let currentState = this.appStateService.getStateCopy();
    let filteredActivities = currentState.activities.filter((a) => a.id !== activity.id);
    this.appStateService.updateState({ activities: filteredActivities });

    let observable = this.http.delete(`${activitiesRoute}${activity.id}`)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      result => {
        return result;
      },
      error => this.handleError);
    return observable;
  }

  updateById(id: string) {
    let observable = this.http.get(`${activitiesRoute}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      activity => {
        let currentState = this.appStateService.getStateCopy();
        let updatedActivities = currentState.activities.map((a) => a.id === activity.id ? activity : a);
        this.appStateService.updateState({ activities: updatedActivities });
      },
      error => this.handleError);
    return observable;
  }
  toggleTimesheet(activity: Activity) {
    let request = this.createTimesheetRequest(activity);

    // Open new / close timesheet for activity
    let observable = this.http.post(request.route, request.requestBody)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      result => {
        this.setCurrent(result);
      },
      error => this.handleError);
  }

  setCurrent(activity: Activity) {
    let currentState = this.appStateService.getStateCopy();
    let updatedActivities = currentState.activities.map((a) => a.id === activity.id ? activity : a);
    let wasSameActivity = currentState.currentActivity ? currentState.currentActivity.id === activity.id : false;

    this.appStateService.updateState({ currentActivity: wasSameActivity ? undefined : activity, activities: updatedActivities });
  }

  // Creates an object with request route and a body which contains the newly selected Activity
  private createTimesheetRequest(updatedActivity: Activity) {
    let route = `${activitiesRoute}/track/`;
    let requestBody = Object.assign({}, { activity: updatedActivity });
    let date = Date.now();
    requestBody = Object.assign(requestBody, { date: date });

    return {
      route: route,
      requestBody: requestBody
    };
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error('error', errMsg);
    return Observable.throw(errMsg);
  }
}
