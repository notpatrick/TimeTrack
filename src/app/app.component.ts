import { Http } from '@angular/http';
import { ActivityActions } from '../store/Actions';
import { AppState, rootReducer, INITIAL_STATE } from '../store/AppState';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import * as createLogger from 'redux-logger';


import { MainPage } from '../pages/main/main';
import { StatisticsPage } from '../pages/statistics/statistics';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MainPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, private ngRedux: NgRedux<AppState>, devTools: DevToolsExtension, private actions: ActivityActions, private http: Http) {
    this.initializeApp();

    this.pages = [
      { title: 'Main Page', component: MainPage },
      { title: 'Statistics', component: StatisticsPage }
    ];

    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE,
      [
        createLogger()
      ],
      devTools.isEnabled() ? [devTools.enhancer()] : []);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Load initial data
      this.actions.getAllActivities();

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
