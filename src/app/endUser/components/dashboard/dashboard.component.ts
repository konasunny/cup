import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { GeolocationService } from '../../../shared/services/geo-location.service';
/// <reference path="./marker-animate-unobtrusive.d.ts" />
declare var google: any;
declare var SlidingMarker: any;
//import * as SlidingMarker from 'marker-animate-unobtrusive';

@Component({
  selector: 'cupcake-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  options: any;
  overlays: any[];
  title = 'cupcake';
  markers = [];
  ref = firebase.database().ref('geolocations/');
  uuid = '11cfa37d-337b-92d3-da18-c1988bbbed31'; //UUID.UUID();
  items: Observable<any[]>;
  users = [];
  estimatedTravelTime = 'checking...';
  cords: string; // just for logging
destLocation = 'pragathi nagar';

  // empty out previous values
    startLocation = [];
    endLocation = [];
    polyLine = [];
    poly2 = [];
  styledMapType = new google.maps.StyledMapType(
    [
      {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#e0efef"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "hue": "#1900ff"
          },
          {
            "color": "#c0e8e8"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "lightness": 100
          },
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "lightness": 700
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#7dcdcd"
          }
        ]
      }
    ],
    { name: 'Styled Map' });
  constructor(afDb: AngularFireDatabase, private geoLocation: GeolocationService) {
    this.deleteMarkers();
    // afDb.list<any>('geolocations').valueChanges().subscribe(
    //   resp => {
    //     let image = 'assets/images/location-tracker.png';
    //     for (var data of resp) {
    //       console.log('db:', data);
    //       let updatelocation = new google.maps.LatLng(data.latitude, data.longitude);
    //       this.addMarker(updatelocation, image);
    //       this.setMapOnAll(this.map);
    //     }
    //   }
    // );
  }

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    let mylocation;

    this.geoLocation.getCurrentLocation({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true,  frequency: 1000 }).subscribe((resp) => {
      mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let image = 'assets/images/location-tracker.png';

      this.initializeMap(mylocation);
      this.styledMap()
      this.addMarker(mylocation, image);
      this.setMapOnAll(this.map);
      directionsDisplay.setMap(this.map);
      this.calculateAndDisplayRoute(directionsService, directionsDisplay, mylocation);
      this.watchLocation();
    });
  }

  calculateAndDisplayRoute(directionsService, directionsDisplay, mylocation) {
    directionsService.route({
      origin: mylocation,
      destination: this.destLocation,
      travelMode: 'DRIVING'
    }, this.onDirectionSuccess.bind(this, directionsDisplay));
  }

  onDirectionSuccess(directionsDisplay, response, status) {
    if (status === 'OK') {
      this.estimatedTravelTime = response.routes[0].legs[0].duration.text
      directionsDisplay.setDirections(response);
      // to get duraiton


      //to get distance
      // response.routes[0].legs[0].distance.text
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  }

  initializeMap(location) {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      // zoom: 12,
      // center: location,
      // mapTypeControlOptions: {
      //   mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
      //     'styled_map']
      // }
    });

    // let lineSymbol = {
    //   path: google.maps.SymbolPath.CIRCLE,
    //   scale: 8,
    //   strokeColor: '#393'
    // };

    // let geocoder = new google.maps.Geocoder();
    // geocoder.geocode({ 'address': 'pragathi nagar' }, this.onGeoCodeSuccess.bind(this, lineSymbol));
    // Create the polyline and add the symbol to it via the 'icons' property.

  }

  // onGeoCodeSuccess(lineSymbol, results, status) {
  //   if (status == 'OK') {
  //     //console.log(results[0].geometry.location)
  //     let res = results[0].geometry.location;
  //     var line = new google.maps.Polyline({
  //       path: [{ lat: 17.4468129, lng: 78.3815562 }, { lat: res.lat(), lng: res.lng() }],
  //       icons: [{
  //         icon: lineSymbol,
  //         offset: '100%'
  //       }],
  //       map: this.map
  //     });

  //     this.animateCircle(line);
  //   } else {
  //     alert('Geocode was not successful for the following reason: ' + status);
  //   }
  // }

  // animateCircle(line) {
  //   var count = 0;
  //   window.setInterval(function () {
  //     count = (count + 1) % 200;

  //     var icons = line.get('icons');
  //     icons[0].offset = (count / 2) + '%';
  //     line.set('icons', icons);
  //   }, 20);
  // }

  styledMap() {
    //Associate the styled map with the MapTypeId and set it to display.
    this.map.mapTypes.set('styled_map', this.styledMapType);
    this.map.setMapTypeId('styled_map');
  }


  watchLocation() {
    this.geoLocation.watchLocation().subscribe((data) => {
      this.onWatchSuccess(data)
    });
  }

  onWatchSuccess(data) {
    //this.deleteMarkers();
    //this.updateGeolocation(this.uuid, data.coords.latitude, data.coords.longitude);
    let updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
    this.cords = data.coords.latitude + ',' + data.coords.longitude;
    let image = 'assets/images/location-tracker.png';
    this.markers[0].setDuration(1000);
      this.markers[0].setEasing('linear');
      let bounds = new google.maps.LatLngBounds();
      //bounds.extend(updatelocation);
      this.map.fitBounds(bounds);
      this.markers[0].setPosition(updatelocation);

    //this.map.setCenter(updatelocation);
  }

  onError(error: any) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.mapElement.nativeElement.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        this.mapElement.nativeElement.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        this.mapElement.nativeElement.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        this.mapElement.nativeElement.innerHTML = "An unknown error occurred."
        break;
    }
  }

  addMarker(location, image) {
    var marker = new SlidingMarker({
      position: location,
      map: this.map,
      title: 'i am title',
      icon: image,
      // icon: {
      //   path: google.maps.SymbolPath.CIRCLE,
      //   scale: 5,
      // }
    });
    // let marker = new google.maps.Marker({
    //   position: location,
    //   map: this.map,
    //   icon: image
    // });
    this.markers.push(marker);
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  updateGeolocation(uuid, lat, lng) {
    if (localStorage.getItem('mykey')) {
      firebase.database().ref('geolocations/' + localStorage.getItem('mykey')).set({
        uuid: uuid,
        latitude: lat,
        longitude: lng
      });
    } else {
      let newData = this.ref.push();
      newData.set({
        uuid: uuid,
        latitude: lat,
        longitude: lng
      });
      localStorage.setItem('mykey', newData.key);
    }
  }

}
