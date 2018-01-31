import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TechScheduleComponent } from './components/tech-schedule/tech-schedule.component';
import { TechprofileComponent } from './components/techprofile/techprofile.component';
import { TechTodoComponent } from './components/tech-todo/tech-todo.component';
import { FormbuilderComponent } from './components/formbuilder/formbuilder.component';
import { WorkordersComponent } from './components/workorders/workorders.component';
import { MapsTechViewComponent } from '../shared/components/maps-tech-view/maps-tech-view.component';

export const technicianRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent,
    children: [
      {
        path: '',
        component: TechScheduleComponent
      },
      {
        path: 'Workorders',
        component: WorkordersComponent
      },
      {
        path: 'formbuilder',
        component: FormbuilderComponent
      },
      {
        path: 'scheduler',
        component: TechScheduleComponent
      },
      {
        path: 'profile',
        component: TechprofileComponent
      },
      {
        path: 'todo',
        component: TechTodoComponent
      },
      {
        path: 'maps',
        component: MapsTechViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(technicianRoutes)],
  exports: [RouterModule]
})
export class TechnicianRoutingModule {}

