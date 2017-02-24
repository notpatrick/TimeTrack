import { ActivityActions, PayloadAction } from './Actions';
import { Action } from 'redux';
import { Activity, ActivityType } from '../interfaces/Activity';

export interface AppState {
  activities: Activity[];
  currentActivity: Activity;
}

export const INITIAL_STATE: AppState = {
  activities: [],
  currentActivity: undefined
} as AppState;

export function rootReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case ActivityActions.CREATEACTIVITY: return Object.assign({}, {
      activities: [...state.activities, (action as PayloadAction).payload],
      currentActivity: state.currentActivity
    });
    case ActivityActions.DELETEACTIVITY: return Object.assign({}, {
      activities: state.activities.filter(element => element.id !== (action as PayloadAction).payload.id),
      currentActivity: state.currentActivity !== undefined ? state.currentActivity.id === (action as PayloadAction).payload.id ? undefined : state.currentActivity : undefined
    });
    case ActivityActions.GETALLACTIVITIES: return Object.assign({}, {
      activities: (action as PayloadAction).payload as Activity[],
      currentActivity: undefined
    });
    case ActivityActions.UPDATEACTIVITY: return state;
    case ActivityActions.SETCURRENTACTIVITY: return Object.assign({}, {
      activities: [...state.activities],
      currentActivity: (action as PayloadAction).payload === state.currentActivity ? undefined : (action as PayloadAction).payload
    });
    default: return state;
  }
}
