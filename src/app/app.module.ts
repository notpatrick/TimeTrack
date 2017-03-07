import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { MainPage } from '../pages/main/main';
import { StatisticsPage } from '../pages/statistics/statistics';
import { CreateActivity } from '../pages/createactivity/createactivity';

import { UserService } from '../providers/User.provider';
import { ActivityService } from '../providers/Activity.provider';
import { AppStateService } from '../providers/AppState.provider';
import { TimePipe } from '../pipes/time.pipe';

@NgModule({
  declarations: [
    MyApp,
    MainPage,
    CreateActivity,
    StatisticsPage,
    TimePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp),
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
    AppStateService,
    ActivityService,
    UserService
  ]
})
export class AppModule { }




