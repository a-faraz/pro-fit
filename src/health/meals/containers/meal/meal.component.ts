import { Component } from '@angular/core';

import { Meal, MealsService } from '../../../shared/services/meals/meals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal',
  styleUrls: ['meal.component.scss'],
  templateUrl: 'meal.component.html'
})
export class MealComponent {
  constructor(private _mealsService: MealsService, private _router: Router) {}

  addMeal(event: Meal) {
    this._mealsService.create(event);
    this.backToMeals();
  }

  backToMeals() {
    this._router.navigate(['meals']);
  }
}
