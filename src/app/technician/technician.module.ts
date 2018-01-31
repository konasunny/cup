import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { TechnicianRoutingModule } from './technician.routing';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TechHeaderComponent } from './components/tech-header/tech-header.component';
import { TechSidebarComponent } from './components/tech-sidebar/tech-sidebar.component';
import { TechScheduleComponent } from './components/tech-schedule/tech-schedule.component';
import { TechcardsComponent } from './components/techcards/techcards.component';
import { TechprofileComponent } from './components/techprofile/techprofile.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TechTodoComponent } from './components/tech-todo/tech-todo.component';
import { FormbuilderComponent } from './components/formbuilder/formbuilder.component';
import { WorkordersComponent } from './components/workorders/workorders.component';
import { NewworkorderComponent } from './components/newworkorder/newworkorder.component';
import { environment } from '../../environments/environment';
import { AngularFireModule } from 'angularfire2';


@NgModule({
  imports: [
    CommonModule,
    TechnicianRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CollapseModule,
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  declarations: [
    DashboardComponent,
    TechHeaderComponent,
    TechSidebarComponent,
    TechScheduleComponent,
    TechcardsComponent,
    CalendarComponent,
    TechprofileComponent,
    TechTodoComponent,
    FormbuilderComponent,
    NewworkorderComponent,
    WorkordersComponent
  ],
  providers: [],
  exports: [],
  entryComponents: [NewworkorderComponent]
})
export class TechnicianModule {
}
