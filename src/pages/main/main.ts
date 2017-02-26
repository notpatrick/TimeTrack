import { ItemSliding } from 'ionic-angular/umd';
import { CreateActivity } from '../createactivity/createactivity';
import { NgRedux } from '@angular-redux/store/lib/components/ng-redux';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Rx';
import { AppState } from '../../store/AppState';
import { ActivityActions } from '../../store/Actions';
import { Activity } from '../../interfaces/Activity';

import {
  animate,
  AnimationTransitionEvent,
  Component,
  keyframes,
  style,
  transition,
  trigger
} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  animations: [
    trigger('removed', [
      transition('* => true', animate(420, keyframes([
        style({ transform: 'translateX(150%)', offset: 0.8 }),
        style({ transform: 'scaleY(0)', height: 0, offset: 1 })
      ]))),
    ])]
})
export class MainPage {
  @select() readonly activities$: Observable<Activity[]>;
  @select() readonly currentActivity$: Observable<Activity>;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private actions: ActivityActions, private ngRedux: NgRedux<AppState>) {
  }

  startDelete(act: Activity, slider: ItemSliding) {
    // TODO: show alert for confirmation
    let confirm = this.alertCtrl.create({
      title: `Really delete ${act.name}?`,
      message: 'All tracked info will be lost!',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            slider.close();
          }
        },
        {
          text: 'Delete',
          handler: () => {

            slider.close();
            act.removed = 'true';
          }
        }
      ]
    });
    confirm.present();
  }

  delete(event: AnimationTransitionEvent, act: Activity) {
    if (event.toState === 'true') this.actions.deleteActivity(act);
  }

  edit(act: Activity, slider: ItemSliding) {
    slider.close();
    this.navCtrl.push(CreateActivity, { activity: act });
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
    this.navCtrl.push(CreateActivity);
  }
}
