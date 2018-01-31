import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'cupcake-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';
  constructor(private router: Router) { }

  ngOnInit() {
    // const url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDE9EQtwwKNgeES-_jGLXGJIF9agJEBi6E&libraries=geometry';
    // let node = document.createElement('script');
    // node.src = url;
    // node.type = 'text/javascript';
    // node.async = true;
    // node.charset = 'utf-8';
    // document.getElementsByTagName('head')[0].appendChild(node);
  }

  login() {
    this.loading = true;
    if (this.model.username === "enduser" && this.model.password === "enduser") {
      this.router.navigate(['./end-user']);
    } else if (this.model.username === "tech" && this.model.password === "tech") {
      this.router.navigate(['./tech']);
    }
    else {
      this.error = 'Username or password is incorrect';
      this.loading = false;
    }
  }
}
