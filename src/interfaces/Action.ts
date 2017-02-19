import { Activity } from './Activity';
export class Action {
  actionType: ActionType;
  card: Activity;
}

export enum ActionType {
  activate,
  deactivate,
  add,
  remove
}
