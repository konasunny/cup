import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule, CollapseModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';

import { UserprofileService } from './services/userprofile.service';

import { EndUserRoutingModule } from './endUser.routing';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EnduserHeaderComponent } from './components/enduser-header/enduser-header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { EnduserSidebarComponent } from './components/enduser-sidebar/enduser-sidebar.component';
import { EnduserCardsComponent } from './components/enduser-cards/enduser-cards.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ServicerequestorderComponent } from './components/servicerequestorder/servicerequestorder.component';
import { EuProfileComponent } from './components/eu-profile/eu-profile.component';
import { HttpModule } from '@angular/http';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EndUserRoutingModule,
    CarouselModule.forRoot(),
    HttpModule,
    CollapseModule,
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    EnduserHeaderComponent,
    CarouselComponent,
    EnduserSidebarComponent,
    EnduserCardsComponent,
    NotificationsComponent,
    ServicerequestorderComponent,
    EuProfileComponent,
    OurServicesComponent
  ],
  entryComponents: [
    EuProfileComponent
  ],
  providers: [UserprofileService]
})
export class EndUserModule { }
