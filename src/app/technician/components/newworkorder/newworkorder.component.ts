import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'cupcake-newworkorder',
  templateUrl: './newworkorder.component.html',
  styleUrls: ['./newworkorder.component.scss']
})
export class NewworkorderComponent implements OnInit {
  model: any = {};

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.bsModalRef.hide();
  }
  
  login() {    
    if (this.model.username === "enduser" && this.model.password === "enduser") {
    } 
  }

}
