import { Response, Http } from '@angular/http';
import { Activity } from '../interfaces/Activity';
import { AppState } from './AppState';
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Action } from 'redux';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

const ACTIVITIES_URL = 'http://www.mocky.io/v2/58aefd57100000c119c94511';

@Injectable()
export class ActivityActions {
  static GETALLACTIVITIES = 'GETALLACTIVITIES';
  static CREATEACTIVITY = 'CREATEACTIVITY';
  static DELETEACTIVITY = 'DELETEACTIVITY';
  static UPDATEACTIVITY = 'UPDATEACTIVITY';
  static SETCURRENTACTIVITY = 'SETCURRENTACTIVITY';
  static UNSETCURRENTACTIVITY = 'UNSETCURRENTACTIVITY';


  constructor(private ngRedux: NgRedux<AppState>, private http: Http) {

  }

  getAllActivities() {
    console.log('loading');
    let observable = this.http.get(ACTIVITIES_URL)
      .map(this.extractData)
      .catch(this.handleError);
    observable.subscribe(
      activities => {
        this.ngRedux.dispatch({ type: ActivityActions.GETALLACTIVITIES, payload: activities });
      },
      error => this.handleError);
  }

  createActivity(activity: Activity) {
    this.ngRedux.dispatch({ type: ActivityActions.CREATEACTIVITY, payload: activity } as PayloadAction);
  }

  deleteActivity(activity: Activity) {
    this.ngRedux.dispatch({ type: ActivityActions.DELETEACTIVITY, payload: activity } as PayloadAction);
  }

  updateActivity(activity: Activity) {
    this.ngRedux.dispatch({ type: ActivityActions.UPDATEACTIVITY, payload: activity } as PayloadAction);
  }

  setCurrentActivity(activity: Activity) {
    this.ngRedux.dispatch({ type: ActivityActions.SETCURRENTACTIVITY, payload: activity } as PayloadAction);
  }

  unsetCurrentActivity() {
    this.ngRedux.dispatch({ type: ActivityActions.UNSETCURRENTACTIVITY });
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
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

export interface PayloadAction extends Action {
  payload: any;
}
