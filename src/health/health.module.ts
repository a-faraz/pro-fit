import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Shared Modules
import { SharedModule } from './shared/shared.module';

// Guards
import { AuthGuard } from '../auth/guards/auth.guard';

export const ROUTES: Routes = [
  { path: 'schedule', canActivate: [AuthGuard], loadChildren: './schedule/schedule.module.ts#ScheduleModule' },
  { path: 'meals', canActivate: [AuthGuard], loadChildren: './meals/meals.module.ts#MealsModule' },
  { path: 'workouts', canActivate: [AuthGuard], loadChildren: './workouts/workouts.module.ts#WorkoutsModule' }
];


@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot()
  ]
})
export class HealthModule {}
