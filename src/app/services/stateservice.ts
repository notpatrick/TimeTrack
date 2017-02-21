import { Observe } from '../../interfaces/Observe';
import { Injectable } from '@angular/core';
import { State } from '../../interfaces/State';
import { Activity, ActivityType } from '../../interfaces/Activity';

@Injectable()
export class StateService {
  private comps: Array<Observe> = [];
  private State: State;
  constructor() {
    // load state from server
    this.State = {
      activities: this.generateMockCards()
    };
  }
  public GetState(): State {
    return this.State;
  }

  public SetState(state: State): State {
    this.State = state;
    this.updateObservers();
    return this.State;
  }

  updateObservers() {
    for (let o of this.comps) {
      o.Update();
    }
  }

  addObserver(o: Observe) {
    this.comps.push(o);
  }

  removeObserver(o: Observe) {
    this.comps.splice(this.comps.indexOf(o), 1);
  }

  generateMockCards(): Array<Activity> {
    return [
      {
        id: 0,
        name: 'Fahrrad fahren',
        type: ActivityType.main
      }, {
        id: 1,
        name: 'Arbeiten',
        type: ActivityType.main
      }, {
        id: 2,
        name: 'Lernen',
        type: ActivityType.main
      }, {
        id: 3,
        name: 'Schlafen',
        type: ActivityType.main
      }, {
        id: 4,
        name: 'Essen',
        type: ActivityType.main
      }, {
        id: 5,
        name: 'Kuchen backen',
        type: ActivityType.main
      }, {
        id: 6,
        name: 'Rauchen',
        type: ActivityType.main
      }, {
        id: 7,
        name: 'Sonstiges',
        type: ActivityType.etc
      }];
  }
}
