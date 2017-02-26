import { Activity } from '../../interfaces/Activity';
import { AppState } from '../../store/AppState';
import { NgRedux } from '@angular-redux/store/lib/components/ng-redux';
import { ActivityActions } from '../../store/Actions';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-createactivity',
  templateUrl: 'createactivity.html'
})
export class CreateActivity {
  private Activity: Activity;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private actions: ActivityActions, private ngRedux: NgRedux<AppState>) {
    let passedData = this.navParams.data.activity as Activity;
    if (passedData) {
      this.Activity = Object.assign({}, passedData);
    } else {
      this.Activity = new Activity();
    }
  }

  accept(): void {
    if (!this.Activity.id) {
      if (this.completenessCheck()) {
        this.actions.createActivity(this.Activity);
        this.navCtrl.pop();
      }
    } else {
      this.actions.updateActivity(this.Activity);
      this.navCtrl.pop();
    }

  }
  cancel(): void {
    this.navCtrl.pop();
  }

  completenessCheck() {
    let hasName = this.Activity.name !== undefined;
    let hasType = this.Activity.type !== undefined;

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

