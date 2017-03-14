import { ToggleObject } from '../interfaces/ToggleObject';
import { AppStateService } from './AppState.provider';
import Activity from '../interfaces/Activity';
import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import config from '../config';
import Timesheet from '../interfaces/Timesheet';
import v4 from 'uuid/v4';

const activitiesRoute = config.activitiesRoute;

@Injectable()
export class ActivityService {
  toggleQueue: ToggleObject[];
  sending: boolean;
  constructor(private http: Http, private appStateService: AppStateService) {
    this.toggleQueue = [];
  }

  getAll() {
    let observable = this.http
      .get(activitiesRoute)
      .map(this.extractData)
      .catch(this.handleError);
    // subscribe to response
    observable.subscribe(
      results => {
        this.appStateService.updateState({ activities: [...results] });
      },
      error => this.handleError);
    return observable;
  }

  create(activity: Activity) {
    let observable = this.http
      .post(activitiesRoute, activity)
      .map(this.extractData)
      .catch(this.handleError);
    // subscribe to response
    observable.subscribe(
      result => {
        let currentState = this.appStateService.getStateCopy();
        let updatedActivities = [...currentState.activities, result];
        this.appStateService.updateState({ activities: updatedActivities });
      },
      error => this.handleError);
  }

  update(activity: Activity) {
    let observable = this.http
      .put(`${activitiesRoute}${activity.id}`, activity)
      .map(this.extractData)
      .catch(this.handleError);
    // subscribe to response
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

    let observable = this.http
      .delete(`${activitiesRoute}${activity.id}`)
      .map(this.extractData)
      .catch(this.handleError);
    // subscribe to response
    observable.subscribe(
      result => {
        return result;
      },
      error => this.handleError);
    return observable;
  }

  updateById(id: string) {
    let observable = this.http
      .get(`${activitiesRoute}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
    // subscribe to response
    observable.subscribe(
      activity => {
        let currentState = this.appStateService.getStateCopy();
        let updatedActivities = currentState.activities.map((a) => a.id === activity.id ? activity : a);
        this.appStateService.updateState({ activities: updatedActivities });
      },
      error => this.handleError);
    return observable;
  }

  toggleTimesheet(request: ToggleObject) {
    // Open new / close timesheet for activity
    let observable = this.http
      .post(request.path, request.body)
      .map(this.extractData)
      .catch(this.handleError);
    // subscribe to response
    observable.subscribe(
      result => {
        this.sendNext(result, true);
      },
      error => this.handleError);
  }

  sendNext(activity: Activity, isResponse: boolean = false) {
    const obs = this.getAll();
    obs.subscribe(() => {
      this.toggleQueue.shift();
      this.setCurrent(activity);
      if (this.toggleQueue.length > 0) {
        this.toggleTimesheet(this.toggleQueue[0]);
      } else {
        this.sending = false;
      }
    });
  }

  addToQueue(activity: Activity) {
    let req = this.createTimesheetRequest(activity);
    this.toggleQueue.push(req);

    if (!this.sending) {
      this.toggleTimesheet(req);
      this.sending = true;
    }
  }

  setCurrent(activity: Activity) {

    this.appStateService.updateState({});
  }

  // Creates an object with request route and a body which contains the newly selected Activity
  private createTimesheetRequest(activity: Activity): ToggleObject {
    let path = `${activitiesRoute}track/`;
    // create new timesheet
    let date = new Date(Date.now());
    let timesheet = this.createTimesheet(activity, date);
    // create request body with timestamp (date)
    let requestBody = {
      date: date,
      timesheet: timesheet,
      activity: activity
    };
    // set the activity locally already in case request takes long time
    this.setCurrent(activity);
    return {
      path: path,
      body: requestBody
    };
  }

  private createTimesheet(activity: Activity, date: Date): Timesheet {
    let openTimesheet = this.getOpenTimesheetFromActivity(activity);
    // if activity already has an open timesheet close and return it
    if (openTimesheet) return Object.assign(openTimesheet, { endDate: date });
    // otherwise create new timesheet
    return {
      id: v4(),
      startDate: date.toISOString(),
      endDate: undefined,
      activity: activity
    };
  }

  private getOpenTimesheetFromActivity(activity: Activity): Timesheet {
    // if any timesheet in activity has no enddate it is open
    return activity.timesheets.find(timesheet => !timesheet.endDate);
  }

  private extractData(res: Response) {
    let body = res.json();
    // console.log(body);
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
    console.error(error);
    return Observable.throw(errMsg);
  }
}
