import { Component, OnInit } from '@angular/core';
import { BsDropdownModule, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';

import { ModalcontentComponent } from '../../../shared/models/modalcontent/modalcontent.component';

import { NotificationsService } from '../../../shared/services/notifications.service';
import { EuProfileComponent } from '../eu-profile/eu-profile.component';
import { ConfirmationmodalComponent } from '../../../shared/models/confirmationmodal/confirmationmodal.component';

@Component({
  selector: 'cupcake-enduser-header',
  templateUrl: './enduser-header.component.html',
  styleUrls: ['./enduser-header.component.scss']
})
export class EnduserHeaderComponent implements OnInit {
  NotificationsList: any[] = [];
  public isCollapsed = false;
  'ModalcontentComponent': ModalcontentComponent;
  'ConfirmationmodalComponent': ConfirmationmodalComponent;
  'EuProfileComponent': EuProfileComponent;
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService,
    private notificationsService: NotificationsService) { }

  ngOnInit() {
    const params = { userType: 1 };
    // TODO: will be deleted once the actual service is ready

    this.notificationsService.getNotifications(params).subscribe(notifications => {
      console.log(notifications);
      // TODO: this is just for reference, will be removed once we integrate with actual data
      this.NotificationsList = notifications;
    },
      err => {
        console.error(err);
      });
  }

  userProfile() {
    const list = [];
    //this.bsModalRef = this.modalService.show(ModalcontentComponent );
    this.bsModalRef = this.modalService.show(EuProfileComponent, { class: 'modal-lg' });
    this.bsModalRef.content.title = 'My Account Settings';
    //this.bsModalRef.content.list = this.NotificationsList;
  }
  public showConfirmationModal(): void {
    const modal = this.modalService.show(ConfirmationmodalComponent);
    (<ConfirmationmodalComponent>modal.content).showConfirmationModal(
      'TODO',
      'Body text 1111'
    );

    (<ConfirmationmodalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {
        // when pressed Yes
        alert('yes');
      } else if (result === false) {
        // when pressed No
        alert('no');
      } else {
        // When closing the modal without no or yes
        alert('yes or no');
      }
    });
  }

}
