import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SharedModule } from './shared/shared.module';


export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      { path: 'register', loadChildren: './register/register.module#RegisterModule' }
    ]
  }
];

// Firebase
export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyD3LIBw-CnnWCGX6efjuuUZqvA5P558HxY",
  authDomain: "pro-fitness-app.firebaseapp.com",
  databaseURL: "https://pro-fitness-app.firebaseio.com",
  projectId: "pro-fitness-app",
  storageBucket: "pro-fitness-app.appspot.com",
  messagingSenderId: "1009289763346"
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    SharedModule
  ]
})
export class AuthModule {}
