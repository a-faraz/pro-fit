import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth/auth.service'

@Component({
  selector: 'register',
  template: `
    <div>

      <auth-form (submitted)="registerUser($event)">
        <h1>Register</h1>
        <a routerLink="/auth/login">Already a member?</a>
        <button type="submit">
          Register
        </button>
        <div class="error" *ngIf="error">
        {{ error }}
        </div>
      </auth-form>
    </div>
  `
})
export class RegisterComponent {

  error: string;

  constructor(
    private _authService: AuthService,
    private router: Router
  ) {}


  async registerUser(event: FormGroup) {
    // Destructuring
    const { email, password } = event.value;
    try {
    await this._authService.createUser(email, password)
    this.router.navigate(['/']);
    } catch (err) {
      this.error = err.message;
    }
  }

}
