import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EndUserRoutingModule } from './endUser.routing';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    EndUserRoutingModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class EndUserModule { }
