import Activity from './Activity';
import Category from './Category';
import User from './User';

export interface AppState {
  activities: Activity[];
  categories: Category[];
  currentActivity: Activity;
  user: User;
}
