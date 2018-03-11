import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { MealsService, Meal } from '../../../shared/services/meals/meals.service'
import { Store } from 'store';

@Component({
  selector: 'app-meals',
  styleUrls: ['meals.component.scss'],
  templateUrl: 'meals.component.html'
})
export class MealsComponent implements OnInit, OnDestroy {

  meals$: Observable<Meal[]>;
  subscription: Subscription;

  constructor(
    private _mealsService: MealsService,
    private _store$: Store
  ) {}

  ngOnInit() {
    console.log('meals before: ', this.meals$);
    this.meals$ = this._store$.select<Meal[]>('meals');
    console.log('meals after: ', this.meals$);
    this.subscription = this._mealsService.meals$.subscribe()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
