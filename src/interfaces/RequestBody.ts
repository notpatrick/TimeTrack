import Activity from './Activity';
import Timesheet from './Timesheet';

export class RequestBody {
  date: Date;
  timesheet: Timesheet;
  activity: Activity;
};
