import { Injectable } from '@angular/core';
import { WebService } from '../../shared/services/web.service';
import { UserProfile } from '../models/userprofile';

@Injectable()
export class UserprofileService extends WebService<UserProfile[]> {
  
  getUserProfile(params) {
    return this.get({
      url: './assets/userProfile.json',
      params: {
        userType: params.userType
      }
    });
  }
}
