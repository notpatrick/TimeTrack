import { AppStateService } from './AppState.provider';
import Activity from '../interfaces/Activity';
import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const ACTIVITIES_URL = 'http://localhost:8080/api/activities/';

@Injectable()
export class ActivityService {

  constructor(private http: Http, private appStateService: AppStateService) { }

  getAll() {
    let observable = this.http.get(ACTIVITIES_URL)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      results => {
        console.log(results);
        this.appStateService.state.activities = Object.assign([], results);
      },
      error => this.handleError);
    return observable;
  }

  create(activity: Activity) {
    let observable = this.http.post(ACTIVITIES_URL, activity)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      result => {
        this.appStateService.state.activities = [...this.appStateService.state.activities, result];
      },
      error => this.handleError);
  }

  update(activity: Activity) {
    let observable = this.http.put(`${ACTIVITIES_URL}${activity.id}`, activity)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      result => {
        this.appStateService.state.activities = this.appStateService.state.activities.map((a) => {
          if (a.id !== result.id) return a;
          return Object.assign({}, result);
        });
      },
      error => this.handleError);
  }

  delete(activity: Activity) {
    this.appStateService.state.activities = this.appStateService.state.activities.filter((a) => a.id !== activity.id);
    let observable = this.http.delete(`${ACTIVITIES_URL}${activity.id}`)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      result => {
        return result;
      },
      error => this.handleError);
    return observable;
  }


  getById(id: string, action: (result: Activity) => void) {
    let observable = this.http.get(`${ACTIVITIES_URL}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      activity => {
        return activity;
      },
      error => this.handleError);
    return observable;
  }

  toggleTimesheet(activity: Activity) {
    // TODO: create new timesheet/close timesheet
    if (this.appStateService.state.currentActivity === activity) {
      this.appStateService.state.currentActivity = undefined;
    } else {
      this.appStateService.state.currentActivity = activity;
    }
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
