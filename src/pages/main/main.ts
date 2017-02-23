import { Observable } from 'rxjs/Rx';
import { AppState } from '../../store/AppState';
import { NgRedux } from '@angular-redux/store/lib/components/ng-redux';
import { ActivityActions } from '../../store/Actions';

import { Activity } from '../../interfaces/Activity';
import { animate, Component, state, style, transition, trigger } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

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
export class MainPage {
  @select() readonly activities$: Observable<Activity[]>;
  @select() readonly currentActivity$: Activity;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private actions: ActivityActions,
    private ngRedux: NgRedux<AppState>) {

  }

  load() {
  }

  getAction(activity: Activity) {

  }

  deleteActivity(event: Event, act: Activity) {


  }
  activityClick(activity: Activity): void {
  }

  addClick(): void {
    this.actions.getAllActivities();
  }
}
