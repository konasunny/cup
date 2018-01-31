import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EuProfileComponent } from './components/eu-profile/eu-profile.component';

export const endUserRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'profile', component: EuProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(endUserRoutes)],
  exports: [RouterModule]
})
export class EndUserRoutingModule {}

