import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'cupcake-modalcontent',
  templateUrl: './modalcontent.component.html',
  styleUrls: ['./modalcontent.component.scss']
})
export class ModalcontentComponent {
  title: string;
  list: any[] = [];
  constructor(public bsModalRef: BsModalRef) {}

}
