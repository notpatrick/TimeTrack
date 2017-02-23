import { ActivitiesActions } from '../activities/activities.actions';
import { IPayloadAction } from '../utils/payload-action';

export function activitiesReducer(state = [], action: IPayloadAction) {
  switch (action.type) {
    case ActivitiesActions.LOAD_SUCCEEDED:
      return action.payload;
    case ActivitiesActions.LOAD_FAILED:
      return action.error;
    case ActivitiesActions.LOAD:
      return action.payload;
  }

  return state;
}
