import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';

import { MainPage } from '../pages/main/main';
import { StatisticsPage } from '../pages/statistics/statistics';

import { UserService } from '../providers/User.provider';
import { ActivityService } from '../providers/Activity.provider';
import { AppStateService } from '../providers/AppState.provider';

import config from '../config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MainPage;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    private appState: AppStateService,
    private userService: UserService,
    private activityService: ActivityService,
    private http: Http) {
    this.initializeApp();

    this.pages = [
      { title: 'Main Page', component: MainPage },
      { title: 'Statistics', component: StatisticsPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Load initial data
      this.activityService.getAll();
      this.userService.getById(config.testUser);

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
