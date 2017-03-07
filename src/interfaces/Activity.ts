import Category from './Category';
import User from './User';
import Timesheet from './Timesheet';

export default class Activity {
  id: string;
  name: string;
  iconname: string;
  category?: Category;
  user?: User;
  _id?: string;
  timesheets?: Timesheet[];

  removed: string = 'false';
}
