import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from 'store';

// feature modules
import { AuthModule } from '../auth/auth.module';

// Firebase
// var config = {
//   apiKey: "AIzaSyD3LIBw-CnnWCGX6efjuuUZqvA5P558HxY",
//   authDomain: "pro-fitness-app.firebaseapp.com",
//   databaseURL: "https://pro-fitness-app.firebaseio.com",
//   projectId: "pro-fitness-app",
//   storageBucket: "pro-fitness-app.appspot.com",
//   messagingSenderId: "1009289763346"
// };

// containers
import { AppComponent } from './containers/app/app.component';

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
  imports: [
    AuthModule,
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
