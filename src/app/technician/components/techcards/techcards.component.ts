import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModalcontentComponent } from '../../../shared/models/modalcontent/modalcontent.component';
import { ConfirmationmodalComponent } from '../../../shared/models/confirmationmodal/confirmationmodal.component';
import { NotificationsService } from '../../../shared/services/notifications.service';

@Component({
  selector: 'cupcake-techcards',
  templateUrl: './techcards.component.html',
  styleUrls: ['./techcards.component.scss']
})
export class TechcardsComponent implements OnInit {  
  NotificationsList: any[] = [];

  'ModalcontentComponent': ModalcontentComponent;
  'ConfirmationmodalComponent': ConfirmationmodalComponent;
  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private notificationsService: NotificationsService    
  ) {}

  ngOnInit() {
    const params = {userType: 1};
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

  openModalWithComponent() {
    const list = [];
    this.bsModalRef = this.modalService.show(ModalcontentComponent);
    this.bsModalRef.content.title = ' Today Work Orders';
    this.bsModalRef.content.list = this.NotificationsList;
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
