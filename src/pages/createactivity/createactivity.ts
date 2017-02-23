import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-createactivity',
  templateUrl: 'createactivity.html'
})
export class CreateActivity {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

  accept(): void {
    this.navCtrl.pop();
  }
  cancel(): void {
    this.navCtrl.pop();
  }
}

