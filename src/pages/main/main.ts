import { Observe } from '../../interfaces/Observe';
import { CreateActivity } from '../createactivity/createactivity';
import { StateService } from '../../app/services/stateservice';
import { Action, ActionType } from '../../interfaces/Action';
import { Activity } from '../../interfaces/Activity';
import { State } from '../../interfaces/State';
import { animate, Component, state, style, transition, trigger } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

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
export class Main extends Observe {
  activities: FirebaseListObservable<any>;
  private _state: State;
  constructor(public navCtrl: NavController, public stateService: StateService, public modalCtrl: ModalController, af: AngularFire) {
    super();
    this.stateService.addObserver(this);
    this._state = this.stateService.GetState();

    // log in to firebase
    af.auth.login();
    this.activities = af.database.list('/activities');
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
    let action = this.getAction(activity);
    this.stateService.SetState(State.reducer(this.stateService.GetState(), action));
  }

  addClick(): void {
    let modal = this.modalCtrl.create(CreateActivity);
    modal.present();

    // test firebase db add
    this.activities.push({ "id": 1, "test": "funktioniert" });
    console.log(this.activities);
  }

  Update(): void {
    this._state = this.stateService.GetState();
  }
}
