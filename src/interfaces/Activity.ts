export class Activity {
  id: number;
  name: string;
  type: string;
  icon?: string;
}

export class ActivityType {
  static Main = 'Main';
  static Etc = 'Etc';
}
