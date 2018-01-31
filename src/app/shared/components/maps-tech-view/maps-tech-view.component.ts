import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MapsGenericComponent } from '../maps-generic/maps-generic.component';

import { GeolocationService } from '../../services/geo-location.service';
import { AngularFireDatabase } from 'angularfire2/database';

declare var google: any;
declare var SlidingMarker: any;
import * as firebase from 'firebase';
@Component({
  selector: 'cupcake-maps-tech-view',
  templateUrl: './maps-tech-view.component.html',
  styleUrls: ['./maps-tech-view.component.scss']
})
export class MapsTechViewComponent extends MapsGenericComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  destLocation = 'begumpet, hyderabad'; // TODO: will get from service

  ref = firebase.database().ref('geolocations/');
  selectedTechnician = '123';
  constructor(protected geoLocation: GeolocationService) {
    super(geoLocation);
  }

  ngOnInit() {
    this.fetchCurrentLocation();
  }

  fetchCurrentLocation() {
    this.getCurrentLocation().subscribe(
      (data) => {
        let currentLocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
        this.initializeMap(this.mapElement.nativeElement, currentLocation);
        this.styledMap();
        this.addMarker(currentLocation);
        this.calculateAndDisplayRoute(currentLocation);
        this.updateGeolocation(this.selectedTechnician, data.coords.latitude, data.coords.longitude);
      },
      (error) => {
        this.mapElement.nativeElement.innerHTML = this.onGeoLocationError(error);
      }
    );
  }

  calculateAndDisplayRoute(currentLocation) {
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);

    directionsService.route({
      origin: currentLocation,
      destination: this.destLocation,
      travelMode: google.maps.TravelMode.DRIVING
    }, this.onDirectionSuccess.bind(this, directionsDisplay));
  }

  onDirectionSuccess(directionsDisplay, response, status) {
    directionsDisplay.setDirections(response);
    this.watchLocation();
  }

  watchLocation() {
    this.geoLocation.watchLocation().subscribe(
      (data) => {
        this.updateGeolocation(this.selectedTechnician, data.coords.latitude, data.coords.longitude);
      },
      (error) => {
        this.mapElement.nativeElement.innerHTML = this.onGeoLocationError(error);
      }
    );
  }

  updateGeolocation(techId, lat, lng) {
    const newData = this.ref.push();
    newData.set({
      uuid: techId,
      latitude: lat,
      longitude: lng
    });
    localStorage.setItem('mykey', newData.key);

  }
}
