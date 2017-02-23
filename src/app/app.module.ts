import { ActivitiesActions } from '../store/activities/activities.actions';
import { StateService } from './services/stateservice';
import { CreateActivity } from '../pages/createactivity/createactivity';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { AppActions } from './app.actions';
import { ActivitiesService } from '../store/activities/activities.service';

import { MyApp } from './app.component';
import { MainPage } from '../pages/main/main';


@NgModule({
  declarations: [
    MyApp,
    MainPage,
    CreateActivity
  ],
  imports: [
    // TODO: add store modules here
    IonicModule.forRoot(MyApp),
    NgReduxModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainPage,
    CreateActivity
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    StateService,
    AppActions,
    ActivitiesService,
    ActivitiesActions
  ]
})
export class AppModule { }




