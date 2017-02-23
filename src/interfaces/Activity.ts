export class Activity {
  id: number;
  name: string;
  type: ActivityType;
}

export enum ActivityType {
  main,
  etc
}
