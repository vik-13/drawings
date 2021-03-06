import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {MaterialModule} from '@angular/material';
import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';

import {appRoutes} from './app.routes';

import {AuthService} from './auth/auth.service';

import {AppComponent} from './app.component';
import {AccountModule} from './components/account/account.module';
import {DashboardModule} from './components/dashboard/dashboard.module';
import {ZonesModule} from "./zones/zones.module";
import {DrawModule} from "./components/draw/draw.module";
import {SharedModule} from "./shared/shared.module";

const firebaseConfig = {
  apiKey: "AIzaSyDfloWIpFJP7HHQCtvrsy4s8g31tmEdgqY",
  authDomain: "drawing-85d6a.firebaseapp.com",
  databaseURL: "https://drawing-85d6a.firebaseio.com",
  storageBucket: "drawing-85d6a.appspot.com",
  messagingSenderId: "209844648290"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),

    AccountModule,
    DashboardModule,
    DrawModule,
    ZonesModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    AuthService
  ]
})
export class AppModule {
}
