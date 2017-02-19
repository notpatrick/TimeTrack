import { StateService } from './services/stateservice';
import { CreateActivity } from '../pages/createactivity/createactivity';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Main } from '../pages/main/main';

@NgModule({
  declarations: [
    MyApp,
    Main,
    CreateActivity
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Main,
    CreateActivity
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
  { provide: StateService, useClass: StateService }]
})
export class AppModule { }
