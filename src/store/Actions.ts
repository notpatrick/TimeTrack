import { update } from 'ionic-angular/umd/components/slides/swiper/swiper';
import { WebRequestService } from '../providers/WebRequest.provider';

import { Activity } from '../interfaces/Activity';
import { AppState } from './AppState';
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Action } from 'redux';


@Injectable()
export class ActivityActions {
  static GETALLACTIVITIES = 'GETALLACTIVITIES';
  static CREATEACTIVITY = 'CREATEACTIVITY';
  static DELETEACTIVITY = 'DELETEACTIVITY';
  static UPDATEACTIVITY = 'UPDATEACTIVITY';
  static SETCURRENTACTIVITY = 'SETCURRENTACTIVITY';
  static UNSETCURRENTACTIVITY = 'UNSETCURRENTACTIVITY';
  static ADDSECOND = 'ADDSECOND';


  constructor(private ngRedux: NgRedux<AppState>, private webRequestService: WebRequestService) {

  }

  getAllActivities() {
    return this.webRequestService.getAll(
      result => {
        this.ngRedux.dispatch({ type: ActivityActions.GETALLACTIVITIES, payload: result });
      });
  }

  createActivity(activity: Activity) {
    this.webRequestService.create(
      activity,
      result => this.ngRedux.dispatch({ type: ActivityActions.CREATEACTIVITY, payload: result })
    );
  }

  deleteActivity(activity: Activity) {
    this.webRequestService.delete(
      activity,
      this.ngRedux.dispatch({ type: ActivityActions.DELETEACTIVITY, payload: activity })
    );
  }

  updateActivity(activity: Activity) {
    this.ngRedux.dispatch({ type: ActivityActions.UPDATEACTIVITY, payload: activity });
  }

  setCurrentActivity(activity: Activity) {
    this.ngRedux.dispatch({ type: ActivityActions.SETCURRENTACTIVITY, payload: activity });
    this.update(activity);
  }

  addSecond(activity: Activity) {
    this.ngRedux.dispatch({ type: ActivityActions.ADDSECOND, payload: activity });
  }

  update(activity: Activity) {
    setTimeout(() => {
      if (this.ngRedux.getState().currentActivity === activity) {
        this.addSecond(activity);
        this.update(activity);
      }
    }, 1000);
  }
}

export interface PayloadAction extends Action {
  payload: any;
}
