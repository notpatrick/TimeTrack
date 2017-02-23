import { Injectable } from '@angular/core';
import { Action } from 'redux';

@Injectable()
export class ActivitiesActions {
  static readonly LOAD_SUCCEEDED = 'LOAD_SUCCEEDED(ACTIVITIES)';
  static readonly LOAD_FAILED = 'LOAD_FAILED(ACTIVITIES)';
  static readonly LOAD = 'LOAD(ACTIVITIES)';

  loadSucceeded(payload) {
    return {
      type: ActivitiesActions.LOAD_SUCCEEDED,
      payload,
    };
  }

  loadFailed(error) {
    return {
      type: ActivitiesActions.LOAD_FAILED,
      error,
    };
  }

  load(payload) {
    return {
      type: ActivitiesActions.LOAD,
      payload
    };
  }
}
