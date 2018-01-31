import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NotificationsService } from './services/notifications.service';
import { WorkordersService } from './services/workorders.service';
import { GeolocationService } from './services/geo-location.service';
import { TechniciansLocationService } from './services/technicians-location.service';

import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ModalcontentComponent } from './models/modalcontent/modalcontent.component';
import { ConfirmationmodalComponent } from './models/confirmationmodal/confirmationmodal.component';
import { ForgotpwdComponent } from './components/forgotpwd/forgotpwd.component';
import { MapsComponent } from './components/maps/maps.component';
import { MapsEndUserViewComponent } from './components/maps-end-user-view/maps-end-user-view.component';
import { MapsGenericComponent } from './components/maps-generic/maps-generic.component';
import { MapsTechViewComponent } from './components/maps-tech-view/maps-tech-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ModalcontentComponent,
    ConfirmationmodalComponent,
    ForgotpwdComponent,
    MapsEndUserViewComponent,
    MapsGenericComponent,
    MapsTechViewComponent
  ],
  providers: [
    NotificationsService,
    WorkordersService,
    GeolocationService,
    TechniciansLocationService
  ],
  exports: [MapsEndUserViewComponent, MapsTechViewComponent],
  entryComponents: [ModalcontentComponent, ConfirmationmodalComponent]
})
export class SharedModule { }
