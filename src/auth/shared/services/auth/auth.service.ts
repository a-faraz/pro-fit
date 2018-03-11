import 'rxjs/add/operator/do';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from 'store'

export interface User {
  email: string,
  uid: string,
  authenticated: boolean
}

@Injectable()
export class AuthService {

  // Observable to create new stream
  auth$ = this._af.authState
    // Do Operator as a side effect to create user object
    .do(next => {
      if (!next) {
        this._store$.set('user', null);
        return;
      }
      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true
      };
      this._store$.set('user', user);
    });

  constructor(
    private _store$: Store,
    private _af: AngularFireAuth
  ) {}

  get authState() {
    return this._af.authState;
  }

  get user() {
    return this._af.auth.currentUser;
  }

  createUser (email: string, password: string)  {
    return this._af.auth
      .createUserWithEmailAndPassword(email, password)
  }

  loginUser (email: string, password: string)  {
    return this._af.auth
      .signInWithEmailAndPassword(email, password)
  }

  logoutUser () {
    return this._af.auth.signOut();
  }
}
