import { ActivitiesService } from '../../store/activities/activities.service';
import { ActivitiesActions } from '../../store/activities/activities.actions';
import { AppActions } from '../../app/app.actions';
import { Observe } from '../../interfaces/Observe';
import { CreateActivity } from '../createactivity/createactivity';
import { StateService } from '../../app/services/stateservice';
import { Action, ActionType } from '../../interfaces/Action';
import { Activity, ActivityType } from '../../interfaces/Activity';
import { State } from '../../interfaces/State';
import { animate, Component, state, style, transition, trigger } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { of } from 'rxjs/observable/of';

import { select } from '@angular-redux/store';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  animations: [
    trigger('isDeleted', [
      state('void', style({
        transform: 'translateX(-150%)'
      })),
      transition('* => void', animate('420ms ease-in-out'))
    ])
  ]

})
export class MainPage extends Observe {
  @select() readonly activities$
  private _state: State;
  constructor(public navCtrl: NavController, public stateService: StateService, public modalCtrl: ModalController, private service: ActivitiesService, private actions: ActivitiesActions) {
    super();
    this.stateService.addObserver(this);
    this._state = this.stateService.GetState();

    this.load();
  }

  load() {
    console.log("Loading");
    action$ => action$
      .ofType(AppActions.LOAD_DATA)
      .switchMap(a => this.service.getAll()
        .map(data => this.actions.loadSucceeded(data))
        .catch(err => of(this.actions.loadFailed(err))));
  }

  getAction(activity: Activity): Action {
    let action = activity === this.stateService.GetState().currentActivity ? ActionType.deactivate : ActionType.activate;
    return {
      actionType: action,
      card: activity
    };
  }

  deleteActivity(event: Event, act: Activity) {

    let action: Action = {
      actionType: ActionType.remove,
      card: act
    };
    this._state = this.stateService.SetState(Activity.reducer(this.stateService.GetState(), action));

  }
  activityClick(activity: Activity): void {
    console.log(this.activities$);
    let action = this.getAction(activity);
    this.stateService.SetState(State.reducer(this.stateService.GetState(), action));
  }

  addClick(): void {
    let act = new Object();
    act['name'] = "New activity";
    act['type'] = ActivityType.main;
    this.navCtrl.push(CreateActivity, act);
  }

  Update(): void {
    this._state = this.stateService.GetState();
  }
}
