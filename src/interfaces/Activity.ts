export class Activity {
  id: number;
  name: string;
  type: string;
  icon: string;
  elapsedSeconds: number; // real time needed
  removed: string = 'false';
}

export class ActivityType {
  static Main = 'Main';
  static Etc = 'Etc';
}
