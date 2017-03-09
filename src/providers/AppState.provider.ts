import { Injectable } from '@angular/core';
import { AppState } from '../interfaces/AppState';

@Injectable()
export class AppStateService {

  constructor() {
    this.timer = this.updateTimer();
  }
  public state: AppState = {} as AppState;
  private timer;
  updateState(updateObject: any) {
    // updateObject is a partial AppState with updated values
    this.state = Object.assign(this.state, updateObject);
    if (this.state.currentActivity) {
      this.state.currentActivity = this.state.activities.find(activity => activity.id === this.state.currentActivity.id);
    } else {
      this.state.currentActivity = AppStateService.checkForOpenTimesheets(this.state.activities);
    }

    // if there are any activities update their times
    if (this.state.activities && this.state.activities.length > 0) {
      this.state.activities
        .forEach(AppStateService.calculateActivityTime);
    };
  }

  static checkForOpenTimesheets(activities) {
    if (!activities || activities.length <= 0) return undefined;
    activities.forEach((activity) => {
      activity.timesheets
        .forEach((timesheet) => {
          if (!timesheet.endDate) {
            return activity;
          }
        });
    });
    return undefined;
  }
  updateTimer() {
    return setInterval(() => {
      if (!this.state.currentActivity) return;
      AppStateService.calculateActivityTime(this.state.currentActivity);
    }, 250);
  }

  static calculateActivityTime(activity) {
    activity.timeInMs = 0;
    if (activity.timesheets && activity.timesheets.length > 0) {
      activity.timesheets
        .forEach((timesheet) => activity.timeInMs += AppStateService.calculateTimesheetDifference(timesheet));
    }
  }

  static calculateTimesheetDifference(timesheet) {
    let startDate = new Date(timesheet.startDate).getTime();
    // check if there is an endDate, if not use Date.now()
    let endDate = timesheet.endDate ? new Date(timesheet.endDate).getTime() : Date.now();
    return endDate - startDate;
  }
  getStateCopy(): AppState {
    return Object.assign({}, this.state);
  }
}
