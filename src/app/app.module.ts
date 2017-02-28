import { TimePipe } from '../pipes/time.pipe';
import { WebRequestService } from '../providers/WebRequest.provider';
import { HttpModule } from '@angular/http';
import { ActivityActions } from '../store/Actions';

import { CreateActivity } from '../pages/createactivity/createactivity';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { NgReduxModule } from '@angular-redux/store';


import { MyApp } from './app.component';
import { MainPage } from '../pages/main/main';
import { StatisticsPage } from '../pages/statistics/statistics';


@NgModule({
  declarations: [
    MyApp,
    MainPage,
    CreateActivity,
    StatisticsPage,
    TimePipe
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
    CreateActivity,
    StatisticsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ActivityActions,
    WebRequestService
  ]
})
export class AppModule { }




