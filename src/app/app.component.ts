import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { combineReducers } from 'redux';
import * as createLogger from 'redux-logger';
import { AppActions } from './app.actions';

import { activitiesReducer } from '../store/activities/activities.reducer';

import { MainPage } from '../pages/main/main';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MainPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, private ngRedux: NgRedux<any>, private actions: AppActions, devTools: DevToolsExtension) {
    this.initializeApp();

    this.pages = [
      { title: 'Main Page', component: MainPage }
    ];

    const rootReducer = combineReducers({
      // combine reducers here
      activities: activitiesReducer
    });

    ngRedux.configureStore(
      rootReducer,
      {},
      [
        createLogger()
      ],
      devTools.isEnabled() ? [devTools.enhancer()] : []);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Load initial data
      this.ngRedux.dispatch(this.actions.loadData());

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
