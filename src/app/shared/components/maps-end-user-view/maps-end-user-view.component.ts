import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MapsGenericComponent } from '../maps-generic/maps-generic.component';

import { GeolocationService } from '../../services/geo-location.service';
import { TechniciansLocationService } from '../../services/technicians-location.service';
import { forEach } from '@angular/router/src/utils/collection';

import * as $ from 'jquery';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
declare var google: any;
declare var SlidingMarker: any;

@Component({
  selector: 'cupcake-maps-end-user-view',
  templateUrl: './maps-end-user-view.component.html',
  styleUrls: ['./maps-end-user-view.component.scss']
})
export class MapsEndUserViewComponent extends MapsGenericComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  ref = firebase.database().ref('geolocations/');
  currentLocation: any;
  markerStore = {};
  // i = 0;
  // deltaLat;
  // deltaLng;
  // numDeltas = 100;
  position = [
    {
      "lat": 17.446877,
      "lng": 78.380641
    },
    {
      "lat": 17.447189,
      "lng": 78.380499
    },
    {
      "lat": 17.447196,
      "lng": 78.380469
    },
    {
      "lat": 17.447249,
      "lng": 78.380237
    },
    {
      "lat": 17.447324,
      "lng": 78.379912
    },
    {
      "lat": 17.447286,
      "lng": 78.379890
    },
    {
      "lat": 17.447137,
      "lng": 78.379858
    },
    {
      "lat": 17.446945,
      "lng": 78.379820
    },
    {
      "lat": 17.446942,
      "lng": 78.379749
    },
    {
      "lat": 17.494568,
      "lng": 78.392055
    }
  ];
  constructor(protected afDb: AngularFireDatabase,
    protected geoLocation: GeolocationService,
    protected techniciansLocation: TechniciansLocationService) {
    super(geoLocation);
  }

  ngOnInit() {
    this.fetchTechniciansLocation();
  }

  fetchTechniciansLocation() {
    this.getCurrentLocation().subscribe((data) => { // TDOD: should be update to get a technician location details
      this.currentLocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      this.initializeMap(this.mapElement.nativeElement, this.currentLocation);
      this.setMapOnAll(this.markers); //TODO check if this is required
      this.styledMap();
      this.watchTechnicians();
      // var myoverlay = new google.maps.OverlayView();
      // myoverlay.draw = function () {
      //     this.getPanes().markerLayer.id='markerLayer';
      // };
      // myoverlay.setMap(this.map);
    });
  }

  watchTechnicians() {
    let technicians = [];
    this.afDb.list<any>('geolocations').valueChanges().subscribe(
      resp => {
        technicians = resp;
        technicians.forEach((technician, index) => {
        technician.uuid = 123;
        const updatedLatLng = new google.maps.LatLng(technician.latitude, technician.longitude);
        let previousPosition = {...updatedLatLng};
        // Do we have this marker already?
        if (this.markerStore.hasOwnProperty(technician.uuid)) {
          previousPosition = this.markerStore[technician.uuid].getPosition();
        } else {
          this.markerStore[technician.uuid] = this.addMarker(updatedLatLng);


          // this.markerStore[technician.technicianId].set('id','marker_'+ technician.technicianId);

          //this.updateMarkers(this.markerStore[technician.technicianId]);
        }
      //   google.maps.event.addListener(this.map, 'click', (event) => {
      //     var result = [event.latLng.lat(), event.latLng.lng()];
      //     this.transition(event.latLng, previousPosition, this.markerStore[technician.technicianId]);
      // });
        this.updateTechniciansPosition(updatedLatLng, previousPosition, technician.uuid);
      });
    });

    // this.techniciansLocation.getTechniciansLocations().subscribe(
    //   (technicians) => {
    //     technicians.forEach((technician, index) => {
    //       this.position.forEach(pos => { // TODO: temp code for testign
    //         let technician = {
    //           technicianId: 123 + index,
    //           position: {
    //             latitude: pos.lat + (index * 0.01),
    //             longitude: pos.lng + (index * 0.01)
    //         }
    //       }

    //       const updatedLatLng = new google.maps.LatLng(technician.position.latitude, technician.position.longitude);
    //       let previousPosition = {...updatedLatLng};
    //       // Do we have this marker already?
    //       if (this.markerStore.hasOwnProperty(technician.technicianId)) {
    //         previousPosition = this.markerStore[technician.technicianId].getPosition();
    //       } else {
    //         this.markerStore[technician.technicianId] = this.addMarker(updatedLatLng);


    //         // this.markerStore[technician.technicianId].set('id','marker_'+ technician.technicianId);

    //         //this.updateMarkers(this.markerStore[technician.technicianId]);
    //       }
    //     //   google.maps.event.addListener(this.map, 'click', (event) => {
    //     //     var result = [event.latLng.lat(), event.latLng.lng()];
    //     //     this.transition(event.latLng, previousPosition, this.markerStore[technician.technicianId]);
    //     // });
    //       this.updateTechniciansPosition(updatedLatLng, previousPosition, technician.technicianId);
    //     });
    //   });
    //   },
    //   (error) => {
    //     this.mapElement.nativeElement.innerHTML = this.onLocationError(error);
    //   }
    // );
  }

  updateTechniciansPosition(updatedlatLng, previousPosition, technicianId) {
    let marker = this.markerStore[technicianId];
    marker.setMap(this.map);
    const heading = google.maps.geometry.spherical.computeHeading(previousPosition, updatedlatLng);
    this.icon.rotation = heading;
    marker.setIcon(this.icon);
    marker.setDuration(2000);
    marker.setEasing('linear');
    marker.setPosition(updatedlatLng, previousPosition);

    //TODO: panTo() should be updated only when it is end user
    // this.map.panTo(updatedlatLng);



  }





    // transition(updatedlatLng, previousPosition, marker){
    //     this.i = 0;
    //     console.log('updated', updatedlatLng.lat());
    //     console.log('previosu', previousPosition.lat());
    //     this.deltaLat = (updatedlatLng.lat() - previousPosition.lat())/this.numDeltas;
    //     this.deltaLng = (updatedlatLng.lng() - previousPosition.lng())/this.numDeltas;
    //     this.moveMarker(marker, previousPosition);
    // }

    // moveMarker(marker, previousPosition){
    //   let lat = previousPosition.lat();
    //   let lng = previousPosition.lng();
    //   lat += this.deltaLat;
    //   lng += this.deltaLng;
    //   var latlng = new google.maps.LatLng(lat, lng);
    //   marker.setPosition(latlng);
    //   if(this.i!=this.numDeltas){
    //     this.i++;
    //     setTimeout(this.moveMarker(marker, latlng), 10);
    //   }
    // }



  onLocationError(error: any) {
    this.mapElement.nativeElement.innerHTML = this.onGeoLocationError(error);
  }
}
