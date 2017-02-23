import { HttpModule } from '@angular/http';
import { ActivityActions } from '../store/Actions';

import { CreateActivity } from '../pages/createactivity/createactivity';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { NgReduxModule } from '@angular-redux/store';


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
    NgReduxModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainPage,
    CreateActivity
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ActivityActions
  ]
})
export class AppModule { }




