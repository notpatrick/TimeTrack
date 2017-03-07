import Activity from './Activity';

export default class Timesheet {
  id: string;
  startDate: string;
  endDate: string;
  activity?: Activity;
  _id?: string;
}
