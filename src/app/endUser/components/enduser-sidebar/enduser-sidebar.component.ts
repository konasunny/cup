import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cupcake-enduser-sidebar',
  templateUrl: './enduser-sidebar.component.html',
  styleUrls: ['./enduser-sidebar.component.scss']
})
export class EnduserSidebarComponent implements OnInit {
  constructor( private router: Router) { }

  ngOnInit() {
  }
}
