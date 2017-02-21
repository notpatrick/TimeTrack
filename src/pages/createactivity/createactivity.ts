import { State } from '../../interfaces/State';
import { Observe } from '../../interfaces/Observe';
import { Action, ActionType } from '../../interfaces/Action';
import { Activity, ActivityType } from '../../interfaces/Activity';
import { StateService } from '../../app/services/stateservice';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-createactivity',
  templateUrl: 'createactivity.html'
})
export class CreateActivity extends Observe {
  private _state: State;
  constructor(public navCtrl: NavController, public navParams: NavParams, public stateService: StateService) {
    super();
    this.stateService.addObserver(this);
    this.typeOptions = [
      'main',
      'etc'
    ];
    console.log(this.navParams.data);
    let passedData = this.navParams.data;
    this.name = passedData.name;
    this.type = passedData.type;
  }

  public name: string;
  public type: string;
  public typeOptions: string[];

  addClick(): void {
    let newActivity: Activity = {
      id: Math.floor(Math.random() * 100000),
      name: this.name,
      type: this.type === 'main' ? ActivityType.main : ActivityType.etc
    };
    let action: Action = {
      actionType: ActionType.add,
      card: newActivity
    };
    let newState = Activity.reducer(this.stateService.GetState(), action);
    this.stateService.SetState(newState);
    this.navCtrl.pop();
  }
  cancelClick(): void {
    this.navCtrl.pop();
  }

  Update(): void {
    this._state = this.stateService.GetState();
  }
}

