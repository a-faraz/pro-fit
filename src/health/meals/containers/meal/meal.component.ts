import { Component, OnInit, OnDestroy } from '@angular/core';

import { Meal, MealsService } from '../../../shared/services/meals/meals.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-meal',
  styleUrls: ['meal.component.scss'],
  templateUrl: 'meal.component.html'
})
export class MealComponent implements OnInit, OnDestroy {
  constructor(
    private _mealsService: MealsService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  meal$: Observable<Meal>;
  subscription: Subscription;

  ngOnInit() {
    this.subscription = this._mealsService.meals$.subscribe();
    this.meal$ = this._route.params
      .switchMap(param => this._mealsService.getMeal(param.id));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addMeal(event: Meal) {
    this._mealsService.create(event);
    this.backToMeals();
  }

  backToMeals() {
    this._router.navigate(['meals']);
  }

  async updateMeal(event: Meal) {
    const key = this._route.snapshot.params.id;
    this._mealsService.update(key, event);
    this.backToMeals();
  }

  async removeMeal(event: Meal) {
    const key = this._route.snapshot.params.id;
    this._mealsService.remove(key);
    this.backToMeals();
  }
}
