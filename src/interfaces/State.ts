import { Action, ActionType } from './Action';
import { Activity } from './Activity';
export class State {
  currentActivity?: Activity;
  activities: Array<Activity>;
  // Reducer
  static reducer(state: State, mpaction: Action): State {
    switch (mpaction.actionType) {
      case ActionType.activate:
        state.currentActivity = mpaction.card;
        break;
      case ActionType.deactivate:
        state.currentActivity = null;
        break;
    }
    return state;
  }
}
