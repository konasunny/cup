import { Component, OnInit } from '@angular/core';
import { BsDropdownModule, BsModalService, BsModalRef } from 'ngx-bootstrap';

import { NewworkorderComponent } from '../newworkorder/newworkorder.component';

@Component({
  selector: 'cupcake-tech-sidebar',
  templateUrl: './tech-sidebar.component.html',
  styleUrls: ['./tech-sidebar.component.scss']
})
export class TechSidebarComponent implements OnInit {

  'NewworkorderComponent': NewworkorderComponent;
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openNewWorkOrderComponent() {
    this.bsModalRef = this.modalService.show(NewworkorderComponent, {class: 'modal-lg'});
    this.bsModalRef.content.title = 'New Work Order';    
  }

}
