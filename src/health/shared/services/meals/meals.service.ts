import { Injectable } from '@angular/core';
import { Store } from 'store';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface Meal {
  name: string,
  ingredients: string[],
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class MealsService {

  meals$: Observable<any> = this._db.list(`meals/${this.uid}`)
    .do(next => this._store$.set('meals', next));

  constructor(
    private _store$: Store,
    private _db: AngularFireDatabase,
    private _authService: AuthService
  ) {}

  get uid() {
    return this._authService.user.uid;
  }

  getMeal(key: string) {
    if (!key) { return Observable.of({}); }
    return this._store$.select<Meal[]>('meals')
      .filter(Boolean)
      .map(meals => meals.find((meal: Meal) => meal.$key === key)) ;
  }

  create(meal: Meal) {
    this._db.list(`meals/${this.uid}`).push(meal);
  }

  remove(key: string) {
    this._db.list(`meals/${this.uid}`).remove(key);
  }

  update(key: string, meal: Meal) {
    this._db.object(`meals/${this.uid}/${key}`).update(meal);
  }
}
