import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { GeolocationService } from './services/geo-location.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  providers: [
    GeolocationService
  ],
  exports: []
})
export class SharedModule { }
