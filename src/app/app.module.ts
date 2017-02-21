import { StateService } from './services/stateservice';
import { CreateActivity } from '../pages/createactivity/createactivity';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Main } from '../pages/main/main';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// AF2 Settings
export const firebaseConfig = {
  apiKey: 'AIzaSyCLpQAv6kOASxV35LsWK8G4wnQlLKwe29U',
  authDomain: 'timetrack-32709.firebaseapp.com',
  databaseURL: 'https://timetrack-32709.firebaseio.com',
  storageBucket: 'timetrack-32709.appspot.com',
  messagingSenderId: '719554459292'
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Anonymous,
  method: AuthMethods.Anonymous,
};

@NgModule({
  declarations: [
    MyApp,
    Main,
    CreateActivity
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
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




