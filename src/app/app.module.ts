import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {DicasPage} from '../pages/dicas/dicas'
import {RegisterPage} from '../pages/register/register'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';

const fireBaseAuth = {
  apiKey: "AIzaSyD8Lzwso8EqmHz_Z3evOhxRalgb0SNby3k",
  authDomain: "nutri-8be3f.firebaseapp.com",
  databaseURL: "https://nutri-8be3f.firebaseio.com",
  projectId: "nutri-8be3f",
  storageBucket: "nutri-8be3f.appspot.com",
  messagingSenderId: "255775091313"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DicasPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(fireBaseAuth),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DicasPage,
    RegisterPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
