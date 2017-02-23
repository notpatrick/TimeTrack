import { ItemSliding } from 'ionic-angular/umd';
import { CreateActivity } from '../createactivity/createactivity';
import { NgRedux } from '@angular-redux/store/lib/components/ng-redux';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Rx';
import { AppState } from '../../store/AppState';
import { ActivityActions } from '../../store/Actions';
import { Activity } from '../../interfaces/Activity';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  @select() readonly activities$: Observable<Activity[]>;
  @select() readonly currentActivity$: Activity;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private actions: ActivityActions,
    private ngRedux: NgRedux<AppState>) { }

  delete(act: Activity, slider: ItemSliding) {
    // TODO: show alert for confirmation
    slider.close();
    this.actions.deleteActivity(act);
  }

  edit(act: Activity, slider: ItemSliding) {
    // TODO: goto create page
    slider.close();
    this.navCtrl.push(CreateActivity, act);
  }

  start(act: Activity) {
    this.actions.setCurrentActivity(act);
  }
  doRefresh(refresher) {

    let observable = this.actions.getAllActivities();
    observable.subscribe(
      success => refresher.complete(),
      error => console.log(error)
    );
  }
  add(): void {
    // TODO: goto create page
    this.navCtrl.push(CreateActivity);
  }
}
