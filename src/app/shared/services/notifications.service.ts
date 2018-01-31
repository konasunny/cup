import { Injectable } from '@angular/core';
import { WebService } from '../../shared/services/web.service';
import { Notifications } from '../models/notifications';

@Injectable()
export class NotificationsService extends WebService<Notifications[]> {

  getNotifications(params) {
    return this.get({
      url: './assets/notifications.json',
      params: {
        userType: params.userType
      }
    });
  }
}
