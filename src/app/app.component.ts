import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { GeolocationService } from './shared/services/geo-location.service';
/// <reference path="./marker-animate-unobtrusive.d.ts" />
declare var google: any;
declare var SlidingMarker: any;
@Component({
  selector: 'cupcake-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  @ViewChild('map') mapElement: ElementRef;
  destLocation = 'Inorbit mall, hyderabad';
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
  heading;
  polyline = null;

  // empty out previous values
    startLocation = [];
    endLocation = [];
    polyLine = [];
    poly2 = [];
    car = "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z";
   icon = {
    path: this.car,
    scale: .7,
    strokeColor: 'white',
    strokeWeight: .10,
    fillOpacity: 1,
    fillColor: '#404040',
    offset: '5%',
    rotation: 45, //parseInt(heading[i]),
    anchor: new google.maps.Point(10, 25) // orig 10,50 back of car, 10,0 front of car, 10,25 center of car
};
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
    //this.deleteMarkers();
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
    this.deleteMarkers();
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    let mylocation;

    this.geoLocation.getCurrentLocation({ maximumAge:Infinity, timeout:60000, enableHighAccuracy: true,  frequency: 3000 }).subscribe((resp) => {
      mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let image = this.icon; //'assets/images/location-tracker.png';
      this.heading = google.maps.geometry.spherical.computeHeading(mylocation, mylocation);
      console.log(this.heading);
    this.icon.rotation = this.heading;
      this.initializeMap(mylocation);
      this.styledMap();
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
      if(this.polyline) this.polyline.setMap(null);
      // to get duraiton
      this.polyline = new google.maps.Polyline({
        path: [],
        strokeColor: '#0000FF',
        strokeWeight: 3
      });
      var bounds = new google.maps.LatLngBounds();


      var legs = response.routes[0].legs;
      for (let i = 0; i < legs.length; i++) {
        var steps = legs[i].steps;
        for (let j = 0; j < steps.length; j++) {
          var nextSegment = steps[j].path;
          for (let k = 0; k < nextSegment.length; k++) {
            this.polyline.getPath().push(nextSegment[k]);
            bounds.extend(nextSegment[k]);
          }
        }
      }

      this.polyline.setMap(this.map);

      //to get distance
      // response.routes[0].legs[0].distance.text
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  }

  initializeMap(location) {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 12,
      center: location,
      // mapTypeControlOptions: {
      //   mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
      //     'styled_map']
      // }
    });
  }



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

    var lastPosn = this.markers[0].getPosition();
    var heading = google.maps.geometry.spherical.computeHeading(lastPosn, updatelocation);
    this.icon.rotation = heading;
    this.markers[0].setIcon(this.icon);
    this.cords = data.coords.latitude + ',' + data.coords.longitude;
    let image = 'assets/images/location-tracker.png';
    this.markers[0].setDuration(2000);
      this.markers[0].setEasing('linear');
      // let bounds = new google.maps.LatLngBounds();
      // bounds.extend(updatelocation);
      // this.map.fitBounds(bounds);

      this.markers[0].setPosition(updatelocation);

      this.map.panTo(updatelocation);

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

  // @ViewChild('map') mapElement: ElementRef;
  // map: any;
  // options: any;
  // overlays: any[];
  // title = 'cupcake';
  // markers = [];
  // ref = firebase.database().ref('geolocations/');
  // uuid = '11cfa37d-337b-92d3-da18-c1988bbbed31'; //UUID.UUID();
  // items: Observable<any[]>;
  // users = [];
  // styledMapType = new google.maps.StyledMapType(
  //   [
  //     {
  //       "featureType": "landscape.natural",
  //       "elementType": "geometry.fill",
  //       "stylers": [
  //         {
  //           "visibility": "on"
  //         },
  //         {
  //           "color": "#e0efef"
  //         }
  //       ]
  //     },
  //     {
  //       "featureType": "poi",
  //       "elementType": "geometry.fill",
  //       "stylers": [
  //         {
  //           "visibility": "on"
  //         },
  //         {
  //           "hue": "#1900ff"
  //         },
  //         {
  //           "color": "#c0e8e8"
  //         }
  //       ]
  //     },
  //     {
  //       "featureType": "road",
  //       "elementType": "geometry",
  //       "stylers": [
  //         {
  //           "lightness": 100
  //         },
  //         {
  //           "visibility": "simplified"
  //         }
  //       ]
  //     },
  //     {
  //       "featureType": "road",
  //       "elementType": "labels",
  //       "stylers": [
  //         {
  //           "visibility": "off"
  //         }
  //       ]
  //     },
  //     {
  //       "featureType": "transit.line",
  //       "elementType": "geometry",
  //       "stylers": [
  //         {
  //           "visibility": "on"
  //         },
  //         {
  //           "lightness": 700
  //         }
  //       ]
  //     },
  //     {
  //       "featureType": "water",
  //       "elementType": "all",
  //       "stylers": [
  //         {
  //           "color": "#7dcdcd"
  //         }
  //       ]
  //     }
  //   ],
  //   { name: 'Styled Map' });
  // constructor(afDb: AngularFireDatabase, private geoLocation: GeolocationService) {
  //   this.deleteMarkers();
  //   afDb.list<any>('geolocations').valueChanges().subscribe(
  //     resp => {
  //       let image = 'assets/images/location-tracker.png';
  //       for (var data of resp) {
  //         console.log(data);
  //         let updatelocation = new google.maps.LatLng(data.latitude, data.longitude);
  //         this.addMarker(updatelocation, image);
  //         this.setMapOnAll(this.map);
  //       }
  //     }
  //   );
  // }

  // ngOnInit(): void {
  //   this.initMap();
  // }

  // initMap() {
  //   let directionsService = new google.maps.DirectionsService;
  //   let directionsDisplay = new google.maps.DirectionsRenderer;
  //   let mylocation;

  //   this.geoLocation.getCurrentLocation({ maximumAge: 500, timeout: 500, enableHighAccuracy: true }).subscribe((resp) => {
  //     mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
  //     this.initializeMap(mylocation);
  //     this.styledMap()

  //     directionsDisplay.setMap(this.map);
  //     this.calculateAndDisplayRoute(directionsService, directionsDisplay, mylocation);
  //     this.watchLocation();
  //   });
  // }

  // calculateAndDisplayRoute(directionsService, directionsDisplay, mylocation) {
  //   directionsService.route({
  //     origin: mylocation,
  //     destination: 'inorbit mall, hyderabad',
  //     travelMode: 'DRIVING'
  //   }, function (response, status) {
  //     if (status === 'OK') {
  //       directionsDisplay.setDirections(response);
  //     } else {
  //       window.alert('Directions request failed due to ' + status);
  //     }
  //   });
  // }

  // initializeMap(location) {
  //   this.map = new google.maps.Map(this.mapElement.nativeElement, {
  //     zoom: 18,
  //     center: location,
  //     mapTypeControlOptions: {
  //       mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
  //         'styled_map']
  //     }
  //   });

  //   // let lineSymbol = {
  //   //   path: google.maps.SymbolPath.CIRCLE,
  //   //   scale: 8,
  //   //   strokeColor: '#393'
  //   // };

  //   // let geocoder = new google.maps.Geocoder();
  //   // geocoder.geocode({ 'address': 'pragathi nagar' }, this.onGeoCodeSuccess.bind(this, lineSymbol));
  //   // Create the polyline and add the symbol to it via the 'icons' property.

  // }

  // // onGeoCodeSuccess(lineSymbol, results, status) {
  // //   if (status == 'OK') {
  // //     //console.log(results[0].geometry.location)
  // //     let res = results[0].geometry.location;
  // //     var line = new google.maps.Polyline({
  // //       path: [{ lat: 17.4468129, lng: 78.3815562 }, { lat: res.lat(), lng: res.lng() }],
  // //       icons: [{
  // //         icon: lineSymbol,
  // //         offset: '100%'
  // //       }],
  // //       map: this.map
  // //     });

  // //     this.animateCircle(line);
  // //   } else {
  // //     alert('Geocode was not successful for the following reason: ' + status);
  // //   }
  // // }

  // // animateCircle(line) {
  // //   var count = 0;
  // //   window.setInterval(function () {
  // //     count = (count + 1) % 200;

  // //     var icons = line.get('icons');
  // //     icons[0].offset = (count / 2) + '%';
  // //     line.set('icons', icons);
  // //   }, 20);
  // // }

  // styledMap() {
  //   //Associate the styled map with the MapTypeId and set it to display.
  //   this.map.mapTypes.set('styled_map', this.styledMapType);
  //   this.map.setMapTypeId('styled_map');
  // }


  // watchLocation() {
  //   this.geoLocation.watchLocation().subscribe((data) => {
  //     this.onWatchSuccess(data)
  //   });
  // }

  // onWatchSuccess(data) {
  //   this.deleteMarkers();
  //   this.updateGeolocation(this.uuid, data.coords.latitude, data.coords.longitude);
  //   let updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
  //   let image = 'assets/images/location-tracker.png';
  //   this.addMarker(updatelocation, image);
  //   this.setMapOnAll(this.map);
  //   this.map.setCenter(updatelocation);
  // }

  // onError(error: any) {
  //   switch (error.code) {
  //     case error.PERMISSION_DENIED:
  //       this.mapElement.nativeElement.innerHTML = "User denied the request for Geolocation."
  //       break;
  //     case error.POSITION_UNAVAILABLE:
  //       this.mapElement.nativeElement.innerHTML = "Location information is unavailable."
  //       break;
  //     case error.TIMEOUT:
  //       this.mapElement.nativeElement.innerHTML = "The request to get user location timed out."
  //       break;
  //     case error.UNKNOWN_ERROR:
  //       this.mapElement.nativeElement.innerHTML = "An unknown error occurred."
  //       break;
  //   }
  // }

  // addMarker(location, image) {
  //   let marker = new google.maps.Marker({
  //     position: location,
  //     map: this.map,
  //     icon: image
  //   });
  //   this.markers.push(marker);
  // }

  // setMapOnAll(map) {
  //   for (var i = 0; i < this.markers.length; i++) {
  //     this.markers[i].setMap(map);
  //   }
  // }

  // clearMarkers() {
  //   this.setMapOnAll(null);
  // }

  // deleteMarkers() {
  //   this.clearMarkers();
  //   this.markers = [];
  // }

  // updateGeolocation(uuid, lat, lng) {
  //   if (localStorage.getItem('mykey')) {
  //     firebase.database().ref('geolocations/' + localStorage.getItem('mykey')).set({
  //       uuid: uuid,
  //       latitude: lat,
  //       longitude: lng
  //     });
  //   } else {
  //     let newData = this.ref.push();
  //     newData.set({
  //       uuid: uuid,
  //       latitude: lat,
  //       longitude: lng
  //     });
  //     localStorage.setItem('mykey', newData.key);
  //   }
  // }
}
      // setMap(resp) {
      //   let ele = this.mapElement.nativeElement;
      //   let mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      //   this.map = new google.maps.Map(ele, {
      //     zoom: 15,
      //     center: mylocation,
      //     mapTypeControlOptions: {
      //       mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
      //         'styled_map']
      //     }
      //   });
      // }

// export const snapshotToArray = snapshot => {
  //   let returnArr = [];

  //   snapshot.forEach(childSnapshot => {
    //       let item = childSnapshot.val();
    //       item.key = childSnapshot.key;
    //       returnArr.push(item);
    //   });

    //   return returnArr;
    // };
