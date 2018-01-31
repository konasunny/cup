import { Component, OnInit } from '@angular/core';
import { BsDropdownModule, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import { TechprofileComponent } from '../techprofile/techprofile.component';

@Component({
  selector: 'cupcake-tech-header',
  templateUrl: './tech-header.component.html',
  styleUrls: ['./tech-header.component.scss']
})
export class TechHeaderComponent implements OnInit {
  public isCollapsed = false;
  
  'TechprofileComponent': TechprofileComponent;
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {    
  }

  techProfile() {
    this.bsModalRef = this.modalService.show(TechprofileComponent, {class: 'modal-lg'});
    this.bsModalRef.content.title = 'My Profile';
    this.bsModalRef.content.submitBtnName = 'Submit';
    this.bsModalRef.content.closeBtnName = 'Cancel';
  }
  

  

}
