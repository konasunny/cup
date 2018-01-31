import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var google: any;
@Component({
  selector: 'cupcake-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  map: any;
  @ViewChild('gmap') mapElement: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  // ngAfterViewInit(): void {
  //   var mapProp = {
  //     center: new google.maps.LatLng(18.5793, 73.8143),
  //     zoom: 15,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };
  //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapProp);
  // }

}
