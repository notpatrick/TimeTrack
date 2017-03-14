import {
  animate,
  AnimationTransitionEvent,
  Component,
  keyframes,
  style,
  transition,
  trigger,
  ViewChild
} from '@angular/core';
import { AlertController, ItemSliding, NavController, Refresher } from 'ionic-angular';

import { CreateActivity } from '../createactivity/createactivity';
import Activity from '../../interfaces/Activity';
import { UserService } from '../../providers/User.provider';
import { ActivityService } from '../../providers/Activity.provider';
import { AppStateService } from '../../providers/AppState.provider';
import { AppState } from '../../interfaces/AppState';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  animations: [
    trigger('removed', [
      transition('* => true', animate(150, keyframes([
        style({ transform: 'scaleY(0)', height: 0, offset: 1 })
      ]))),
    ])]
})
export class MainPage {
  @ViewChild(Refresher) refresher: Refresher;
  public state: AppState;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public appState: AppStateService, public userService: UserService, public activityService: ActivityService) {
    this.state = this.appState.state;
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
            act.removed = 'true';
          }
        }
      ]
    });
    confirm.present();
  }

  delete(event: AnimationTransitionEvent, act: Activity) {
    if (event.toState === 'true') {
      this.refresher.state = 'refreshing';
      this.activityService.delete(act).subscribe(
        result => this.refresher.complete()
      );
    };
  }

  edit(act: Activity, slider: ItemSliding) {
    slider.close();
    this.navCtrl.push(CreateActivity, { activity: act });
  }
  activityClick(act: Activity) {
    this.activityService.addToQueue(act);
  }
  doRefresh(refresher) {
    let observable = this.activityService.getAll();
    observable.subscribe(
      success => refresher.complete(),
      error => console.log(error)
    );
  }
  add(): void {
    this.navCtrl.push(CreateActivity);
  }
}
