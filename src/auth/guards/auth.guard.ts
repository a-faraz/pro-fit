import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// SERVICES
import { AuthService } from '../shared/services/auth/auth.service';

// RXJS
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {}

  canActivate (): Observable<boolean> {
    return this._authService.authState
      .map(user => {
        if (!user) {
          this._router.navigate(['/auth/login']);
        }
        return !!user;
      });
  }
}
