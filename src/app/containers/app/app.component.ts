// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// SERVICES
import { AuthService, User } from '../../../auth/shared/services/auth/auth.service';

// RXJS
import { Store } from 'store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <app-header
        [user]="user$ | async"
        (logout)="onLogout()"
        >
      </app-header>
      <app-nav
        *ngIf="(user$ | async)?.authenticated">
      </app-nav>
      <h1>{{ user$ | async | json }}</h1>
      <div class="wrapper">
      <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {

  user$: Observable<User>;
  subscription: Subscription;

  constructor(
    private _store$: Store,
    private _router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit () {
    // Initiate dataflow for the subscription
    this.subscription = this._authService.auth$.subscribe();
    // Set the user from the value in the store
    this.user$ = this._store$.select<User>('user');
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  async onLogout () {
    await this._authService.logoutUser();
    this._router.navigate(['/auth/login']);
  }
}
