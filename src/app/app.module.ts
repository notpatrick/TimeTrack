import { StateService } from './services/stateservice';
import { CreateActivity } from '../pages/createactivity/createactivity';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Main } from '../pages/main/main';
import { NeuePage } from '../pages/neue/neue';

@NgModule({
  declarations: [
    MyApp,
    Main,
    CreateActivity,
    NeuePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Main,
    CreateActivity,
    NeuePage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
  { provide: StateService, useClass: StateService }]
})
export class AppModule { }




