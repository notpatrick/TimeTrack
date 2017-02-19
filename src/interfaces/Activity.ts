import { Action, ActionType } from './Action';
import { State } from './State';
export class Activity {
  id: number;
  name: string;
  type: ActivityType;
  remove?: string = 'in';
  static reducer(state: State, mpaction: Action): State {
    switch (mpaction.actionType) {
      case ActionType.add:
        state.activities.push(mpaction.card);
        break;
      case ActionType.remove:
        let index = state.activities.indexOf(mpaction.card);
        state.activities.splice(index, 1);
    }
    return state;
  }
}

export enum ActivityType {
  main,
  etc
}
