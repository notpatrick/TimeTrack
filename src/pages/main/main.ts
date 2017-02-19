import { Observe } from '../../interfaces/Observe';
import { CreateActivity } from '../createactivity/createactivity';
import { StateService } from '../../app/services/stateservice';
import { Action, ActionType } from '../../interfaces/Action';
import { Activity } from '../../interfaces/Activity';
import { State } from '../../interfaces/State';
import { animate, Component, state, style, transition, trigger } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  animations: [
    trigger('isDeleted', [
      state('out', style({
        transform: 'translateX(-10%)'
      })),
      state('in, void, *', style({
        transform: 'translateX(0)'
      })),
      transition('in => out', animate('220ms ease-in-out')),
    ])
  ]

})
export class Main extends Observe {
  private _state: State;
  constructor(public navCtrl: NavController, public stateService: StateService, public modalCtrl: ModalController) {
    super();
    this.stateService.addObserver(this);
    this._state = this.stateService.GetState();
  }

  getAction(activity: Activity): Action {
    let action = activity === this.stateService.GetState().currentActivity ? ActionType.deactivate : ActionType.activate;
    return {
      actionType: action,
      card: activity
    };
  }

  swiped(act: Activity): void {
    this.deleteActivity(act);
  }

  deleteActivity(act: Activity) {
    let action: Action = {
      actionType: ActionType.remove,
      card: act
    };
    this._state = Activity.reducer(this.stateService.GetState(), action);
    this.stateService.SetState(this._state);
  }
  activityClick(activity: Activity): void {
    let action = this.getAction(activity);
    this.stateService.SetState(State.reducer(this.stateService.GetState(), action));
  }

  addClick(): void {
    let modal = this.modalCtrl.create(CreateActivity);
    modal.present();
  }

  Update(): void {
    this._state = this.stateService.GetState();
  }
}
