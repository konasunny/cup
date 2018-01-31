import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { Notifications } from '../../../shared/models/notifications';

@Component({
  selector: 'cupcake-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  NotificationsList: Notifications[];

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    const params = {userType: 1}; // TODO: will be deleted once the actual service is ready

    this.notificationsService.getNotifications(params).subscribe(notifications => {
     // console.log(notifications); // TODO: this is just for reference, will be removed once we integrate with actual data
      this.NotificationsList = notifications;
    },
    err => {
      console.error(err);
    });
  }
}
