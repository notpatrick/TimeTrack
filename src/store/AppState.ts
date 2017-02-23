import { ActivityActions, PayloadAction } from './Actions';
import { Action } from 'redux';
import { Activity, ActivityType } from '../interfaces/Activity';

export interface AppState {
  activities: Activity[];
  currentActivity: Activity;
}

export const INITIAL_STATE: AppState = {
  activities: [],
  currentActivity: {}
} as AppState;

export function rootReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case ActivityActions.CREATEACTIVITY: return Object.assign({}, {
      activities: [...state.activities, (action as PayloadAction).payload],
      currentActivity: state.currentActivity
    });
    case ActivityActions.DELETEACTIVITY: return Object.assign({}, {
      activities: state.activities.filter(element => element !== (action as PayloadAction).payload),
      currentActivity: state.currentActivity === (action as PayloadAction).payload ? undefined : state.currentActivity
    });
    case ActivityActions.GETALLACTIVITIES:
      console.log('action', action);
      return {
        activities: (action as PayloadAction).payload as Activity[],
        currentActivity: {
          id: 1,
          name: 'Arbeiten',
          type: ActivityType.etc
        }
      } as AppState;
    case ActivityActions.UPDATEACTIVITY: return state;
    case ActivityActions.SETCURRENTACTIVITY: return state;
    case ActivityActions.UNSETCURRENTACTIVITY: return state;
    default: return state;
  }
}
