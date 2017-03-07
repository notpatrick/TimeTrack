import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';

import Category from '../../interfaces/Category';
import User from '../../interfaces/User';
import Activity from '../../interfaces/Activity';

import { AppStateService } from '../../providers/AppState.provider';
import { UserService } from '../../providers/User.provider';
import { ActivityService } from '../../providers/Activity.provider';
import { AppState } from '../../interfaces/AppState';

@Component({
  selector: 'page-createactivity',
  templateUrl: 'createactivity.html'
})
export class CreateActivity {
  iconNames = ['ionic', 'logo-angular', 'heart', 'ionitron', 'happy', 'people', 'person', 'contact', 'apps', 'lock', 'key', 'unlock', 'map', 'navigate', 'pin', 'locate', 'mic', 'musical-notes', 'volume-up', 'microphone', 'cafe', 'calculator', 'bus', 'wine', 'camera', 'image', 'star', 'arrow-dropup-circle', 'arrow-back', 'arrow-dropdown', 'arrow-forward', 'cloud', 'sunny', 'umbrella', 'rainy'];

  private Activity: Activity;

  public state: AppState;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    public appState: AppStateService,
    public userService: UserService,
    public activityService: ActivityService) {
    this.state = this.appState.state;
    // Parse navigation parameter as Activity
    let passedData = this.navParams.data.activity as Activity;
    if (passedData) {
      // Create local copy of passed Activity
      this.Activity = Object.assign({}, passedData);
    } else {
      // New Activity if parse failed
      this.Activity = new Activity();
      this.Activity.category = {
        id: '40dc66f0-3cd5-47f5-acd2-b3af8284f4c1',
        name: 'Kategorie1',
        _id: '58bf3600e50e14287a3ae741'
      };
      this.Activity.user = this.state.user;
    }
  }

  accept(): void {
    // Check if local Activity has an ID
    if (!this.Activity.id) {
      // Create new Activity
      if (this.completenessCheck()) {
        this.activityService.create(this.Activity);
        this.navCtrl.pop();
      }
    } else {
      // Update existing Activity
      this.activityService.update(this.Activity);
      this.navCtrl.pop();
    }

  }
  cancel(): void {
    this.navCtrl.pop();
  }

  iconClick(icon) {
    this.Activity.iconname = icon;
  }

  completenessCheck() {
    let hasName = this.Activity.name !== undefined;
    let hasType = this.Activity.category !== undefined;

    let message1 = 'A name is required.';
    let message2 = 'A type is required.';

    if (!hasName) {
      let toast = this.toastCtrl.create({
        message: message1,
        duration: 3000
      });
      toast.present();
      return false;
    } else if (!hasType) {
      let toast = this.toastCtrl.create({
        message: message2,
        duration: 3000
      });
      toast.present();
      return false;
    } else {
      return true;
    }
  }
}

