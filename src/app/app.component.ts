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
  destLocation = 'begumpet, hyderabad';
  map: any;
  options: any;
  overlays: any[];
  title = 'cupcake';
  markers = [];
  ref = firebase.database().ref('geolocations/');
  uuid = '11cfa37d-337b-92d3-da18-c1988bbbed31'; // UUID.UUID();
  items: Observable<any[]>;
  users = [];
  estimatedTravelTime = 'checking...';
  cords: string; // just for logging
  heading;
  polyline = [];
  wayPointLocation: any;
  sourceLocation: any;
  inititalRoadPointLocation: any;
  // empty out previous values
  startLocation = [];
  endLocation = [];

  poly2 = [];
  car = `M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,
    5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,
    20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,
    14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,
    10.773,11.3,7.755,20.625,10.773z M3.748,
    21.713v4.492l-2.73-0.349 V14.502L3.748,
    21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,
    40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,
    35.805v-7.872l2.729-0.355v10.048L19.328,35.805z`;
  icon = {
    path: this.car,
    scale: .7,
    strokeColor: 'white',
    strokeWeight: .10,
    fillOpacity: 1,
    fillColor: '#404040',
    offset: '5%',
    rotation: 45, // parseInt(heading[i]),
    anchor: new google.maps.Point(10, 25) // orig 10,50 back of car, 10,0 front of car, 10,25 center of car
  };

  styledMapType = new google.maps.StyledMapType(
    [
      {
          "featureType": "water",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#b5cbe4"
              }
          ]
      },
      {
          "featureType": "landscape",
          "stylers": [
              {
                  "color": "#efefef"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#83a5b0"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#bdcdd3"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#e3eed3"
              }
          ]
      },
      {
          "featureType": "administrative",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "lightness": 33
              }
          ]
      },
      {
          "featureType": "road"
      },
      {
          "featureType": "poi.park",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {},
      {
          "featureType": "road",
          "stylers": [
              {
                  "lightness": 20
              }
          ]
      }
    ],
    { name: 'Styled Map' });

    constructor(afDb: AngularFireDatabase, private geoLocation: GeolocationService) {
    // this.deleteMarkers();
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
    //this.deleteMarkers();
    let mylocation;

    this.geoLocation.getCurrentLocation({
      maximumAge: Infinity,
      timeout: 60000,
      enableHighAccuracy: true,
      frequency: 3000
    }).subscribe((resp) => {
      mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.sourceLocation = mylocation;
      const image = this.icon; // 'assets/images/location-tracker.png';
      this.heading = google.maps.geometry.spherical.computeHeading(mylocation, mylocation);
      console.log(this.heading);

      this.icon.rotation = this.heading;
      this.initializeMap(mylocation);
      this.styledMap();
      this.addMarker(mylocation, image);
      this.setMapOnAll(this.map);
      this.calculateAndDisplayMuliRoutes(mylocation);

    });
  }

  initializeMap(location) {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: location,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      rotateControl: true
      // mapTypeControlOptions: {
      //   mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
      //     'styled_map']
      // }
    });
  }

  styledMap() {
    // Associate the styled map with the MapTypeId and set it to display.
    this.map.mapTypes.set('styled_map', this.styledMapType);
    this.map.setMapTypeId('styled_map');
  }

  addMarker(location, image) {
    const marker = new SlidingMarker({
      position: location,
      map: this.map,
      title: 'i am title',
      icon: image,
      draggable: true
    });
    this.markers.push(marker);
  }

  setMapOnAll(map) {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
    // TODO: check if we need to show traffic layer
    // const trafficLayer = new google.maps.TrafficLayer();
    // trafficLayer.setMap(map);
  }

  calculateAndDisplayMuliRoutes(mylocation) {
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);
    let wayPts = [];
    if (this.wayPointLocation) {
      wayPts.push({
        location: this.wayPointLocation,
        stopover: false
      });
    }
    directionsService.route({
      origin: mylocation,
      destination: this.destLocation,
      // waypoints: wayPts,  // TODO: will be used when multi route options is set( providealternateroutes)
      travelMode: google.maps.TravelMode.DRIVING,
      //provideRouteAlternatives: true, // TODO: will be used when multi route options is set
      drivingOptions: { // TODO: will work with premium licence
        departureTime: new Date(Date.now()),
        trafficModel: 'optimistic'
      }
    }, this.onDirectionSuccess.bind(this, directionsDisplay));
  }

  reRoute() {

    this.polyline.forEach(poly => {
      poly.setMap(null);
    });

    console.log('reRouting');
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);
    let wayPts = [];
    if (this.wayPointLocation) {
      wayPts.push({
        location: this.wayPointLocation,
        stopover: false
      });
    }
    directionsService.route({
      origin: this.sourceLocation,
      destination: this.destLocation,
      waypoints: wayPts,
      travelMode: 'DRIVING',
      //provideRouteAlternatives: true,
      drivingOptions: { // will work with premium licence
        departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
        trafficModel: 'optimistic'
      }
    }, this.onDirectionSuccess.bind(this, directionsDisplay));
  }

  onDirectionSuccess(directionsDisplay, response, status) {
    let infowindow = new google.maps.InfoWindow();

    if (status === 'OK') {
      response.routes.forEach((route, index) => {
        if (index === 0) {
          this.estimatedTravelTime = route.legs[0].duration.text;
          this.polyline.push(new google.maps.Polyline({
            path: [],
            strokeColor: '#7676f9',
            strokeWeight: 7,
            stokeOpacity: 1
          }));
          // directionsDisplay.setDirections(response);

          // if (this.polyline) {
          //   this.polyline.setMap(null);
          // }
          const bounds = new google.maps.LatLngBounds();

          const legs = route.legs;
          this.inititalRoadPointLocation = legs[0].start_location;
          console.log('roadpoint start location', legs[0].start_location.lat() + ',' + legs[0].start_location.lng());
          var geocoder = new google.maps.Geocoder();
          geocoder.geocode({'location': legs[0].start_location}, function(results, status) {
            if (status === 'OK') {
              console.log(results);
            }
          });
          for (let i = 0; i < legs.length; i++) {
            const steps = legs[i].steps;
            for (let j = 0; j < steps.length; j++) {
              const nextSegment = steps[j].path;
              for (let k = 0; k < nextSegment.length; k++) {
                this.polyline[index].getPath().push(nextSegment[k]);
                bounds.extend(nextSegment[k]);
              }
            }
          }

          this.polyline[index].setMap(this.map);

          google.maps.event.addListener(this.polyline[index], 'click', (function (poly, map, travelTime) {
            return function (event) {
              infowindow.setContent(travelTime);
              infowindow.setPosition(event.latLng);
              infowindow.open(this.map);
              // poly.setOptions({ strokeColor: 'black' }); // TODO: check if this is needed
            };
          })(this.polyline[index], this.map, this.estimatedTravelTime));

          // TODO: try to show time betwen the middle of the route math
          // const startLoc = route.legs["0"].start_location;
          // const endLoc = route.legs["0"].end_location;
          // const inBetween = google.maps.geometry.spherical.interpolate(startLoc, endLoc, 0.5);
          // infowindow.content = 'travel time will be ' + this.estimatedTravelTime;
          // infowindow.position = inBetween;
          // infowindow.open(this.map);
        }
      });
      this.watchLocation();
      // to get distance
      // response.routes[0].legs[0].distance.text
    } else {
      // TODO: show a modal popup
      window.alert('Directions request failed due to ' + status);
    }
  }

  watchLocation() {
    this.geoLocation.watchLocation().subscribe((data) => {
      const updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'location': updatelocation}, function(results, status) {
        if (status === 'OK') {
          console.log(results);
        }
      });

      //if (google.maps.geometry.poly.isLocationOnEdge(updatelocation, this.polyline[0], 0.0001)) {
        console.log("in line");
        this.onWatchSuccess(data);
      //}
      // else {
      //  this.wayPointLocation = updatelocation;
        //this.reRoute();
     // }
    });
  }

  onWatchSuccess(data) {
    // this.deleteMarkers();
    // this.updateGeolocation(this.uuid, data.coords.latitude, data.coords.longitude);
    const updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
    //17.5186458,78.39625290000004
    // 17.4468897,78.3806721
    let drivingStarted = false;
    drivingStarted = this.getDistance(updatelocation, this.inititalRoadPointLocation) < 50;
    if (drivingStarted && google.maps.geometry.poly.isLocationOnEdge(updatelocation, this.polyline[0], 0.001)) {
      this.wayPointLocation = updatelocation;
      this.reRoute();
    }

    const lastPosn = this.markers[0].getPosition();
    console.log('lastPos', lastPosn.lat() + ',' + lastPosn.lng() );
    console.log('uptdPos', updatelocation.lat() + ',' + updatelocation.lng());
    const heading = google.maps.geometry.spherical.computeHeading(lastPosn, updatelocation);
    console.log(heading);
    this.icon.rotation = heading;
    this.markers[0].setIcon(this.icon);
    this.cords = data.coords.latitude + ',' + data.coords.longitude;
   // const image = 'assets/images/location-tracker.png';
    this.markers[0].setDuration(2000);
    this.markers[0].setEasing('linear');
    this.map.setHeading(heading + 90);
    this.map.setTilt(45);
    console.log('tilt', this.map.getTilt());
    //this.map.setTilt(45);
    // let bounds = new google.maps.LatLngBounds();
    // bounds.extend(updatelocation);
    // this.map.fitBounds(bounds);

    this.markers[0].setPosition(updatelocation);

    this.map.panTo(updatelocation);

    // this.map.setCenter(updatelocation);
  }

  onError(error: any) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.mapElement.nativeElement.innerHTML = 'User denied the request for Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        this.mapElement.nativeElement.innerHTML = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        this.mapElement.nativeElement.innerHTML = 'The request to get user location timed out.';
        break;
      case error.UNKNOWN_ERROR:
        this.mapElement.nativeElement.innerHTML = 'An unknown error occurred.';
        break;
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  rad(x) {
    return x * Math.PI / 180;
  };

  //Get distance in meter
  getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
   var dLat = this.rad(p2.lat() - p1.lat());
   var dLong = this.rad(p2.lng() - p1.lng());
   var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
     Math.cos(this.rad(p1.lat())) * Math.cos(this.rad(p2.lat())) *
     Math.sin(dLong / 2) * Math.sin(dLong / 2);
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   var d = R * c;
   return d; // returns the distance in meter
 };

  updateGeolocation(uuid, lat, lng) {
    if (localStorage.getItem('mykey')) {
      firebase.database().ref('geolocations/' + localStorage.getItem('mykey')).set({
        uuid: uuid,
        latitude: lat,
        longitude: lng
      });
    } else {
      const newData = this.ref.push();
      newData.set({
        uuid: uuid,
        latitude: lat,
        longitude: lng
      });
      localStorage.setItem('mykey', newData.key);
    }
  }


//   @ViewChild('map') mapElement: ElementRef;
//   destLocation = 'Inorbit mall, hyderabad';
//   map: any;
//   options: any;
//   overlays: any[];
//   title = 'cupcake';
//   markers = [];
//   ref = firebase.database().ref('geolocations/');
//   uuid = '11cfa37d-337b-92d3-da18-c1988bbbed31'; //UUID.UUID();
//   items: Observable<any[]>;
//   users = [];
//   estimatedTravelTime = 'checking...';
//   cords: string; // just for logging
//   heading;
//   polyline = null;

//   // empty out previous values
//     startLocation = [];
//     endLocation = [];
//     polyLine = [];
//     poly2 = [];
//     car = "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z";
//    icon = {
//     path: this.car,
//     scale: .7,
//     strokeColor: 'white',
//     strokeWeight: .10,
//     fillOpacity: 1,
//     fillColor: '#404040',
//     offset: '5%',
//     rotation: 45, //parseInt(heading[i]),
//     anchor: new google.maps.Point(10, 25) // orig 10,50 back of car, 10,0 front of car, 10,25 center of car
// };
//   styledMapType = new google.maps.StyledMapType(
//     [
//       {
//         "featureType": "landscape.natural",
//         "elementType": "geometry.fill",
//         "stylers": [
//           {
//             "visibility": "on"
//           },
//           {
//             "color": "#e0efef"
//           }
//         ]
//       },
//       {
//         "featureType": "poi",
//         "elementType": "geometry.fill",
//         "stylers": [
//           {
//             "visibility": "on"
//           },
//           {
//             "hue": "#1900ff"
//           },
//           {
//             "color": "#c0e8e8"
//           }
//         ]
//       },
//       {
//         "featureType": "road",
//         "elementType": "geometry",
//         "stylers": [
//           {
//             "lightness": 100
//           },
//           {
//             "visibility": "simplified"
//           }
//         ]
//       },
//       {
//         "featureType": "road",
//         "elementType": "labels",
//         "stylers": [
//           {
//             "visibility": "off"
//           }
//         ]
//       },
//       {
//         "featureType": "transit.line",
//         "elementType": "geometry",
//         "stylers": [
//           {
//             "visibility": "on"
//           },
//           {
//             "lightness": 700
//           }
//         ]
//       },
//       {
//         "featureType": "water",
//         "elementType": "all",
//         "stylers": [
//           {
//             "color": "#7dcdcd"
//           }
//         ]
//       }
//     ],
//     { name: 'Styled Map' });
//   constructor(afDb: AngularFireDatabase, private geoLocation: GeolocationService) {
//     //this.deleteMarkers();
//     // afDb.list<any>('geolocations').valueChanges().subscribe(
//     //   resp => {
//     //     let image = 'assets/images/location-tracker.png';
//     //     for (var data of resp) {
//     //       console.log('db:', data);
//     //       let updatelocation = new google.maps.LatLng(data.latitude, data.longitude);
//     //       this.addMarker(updatelocation, image);
//     //       this.setMapOnAll(this.map);
//     //     }
//     //   }
//     // );
//   }

//   ngOnInit(): void {
//     this.initMap();
//   }

//   initMap() {
//     this.deleteMarkers();
//     let directionsService = new google.maps.DirectionsService;
//     let directionsDisplay = new google.maps.DirectionsRenderer;
//     let mylocation;

//     this.geoLocation.getCurrentLocation({ maximumAge:Infinity, timeout:60000, enableHighAccuracy: true,  frequency: 3000 }).subscribe((resp) => {
//       mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
//       let image = this.icon; //'assets/images/location-tracker.png';
//       this.heading = google.maps.geometry.spherical.computeHeading(mylocation, mylocation);
//       console.log(this.heading);
//     this.icon.rotation = this.heading;
//       this.initializeMap(mylocation);
//       this.styledMap();
//       this.addMarker(mylocation, image);
//       this.setMapOnAll(this.map);
//       directionsDisplay.setMap(this.map);
//       this.calculateAndDisplayRoute(directionsService, directionsDisplay, mylocation);
//       this.watchLocation();
//     });
//   }

//   calculateAndDisplayRoute(directionsService, directionsDisplay, mylocation) {
//     directionsService.route({
//       origin: mylocation,
//       destination: this.destLocation,
//       travelMode: 'DRIVING'
//     }, this.onDirectionSuccess.bind(this, directionsDisplay));
//   }

//   onDirectionSuccess(directionsDisplay, response, status) {
//     if (status === 'OK') {
//       this.estimatedTravelTime = response.routes[0].legs[0].duration.text
//       directionsDisplay.setDirections(response);
//       if(this.polyline) this.polyline.setMap(null);
//       // to get duraiton
//       this.polyline = new google.maps.Polyline({
//         path: [],
//         strokeColor: '#0000FF',
//         strokeWeight: 3
//       });
//       var bounds = new google.maps.LatLngBounds();


//       var legs = response.routes[0].legs;
//       for (let i = 0; i < legs.length; i++) {
//         var steps = legs[i].steps;
//         for (let j = 0; j < steps.length; j++) {
//           var nextSegment = steps[j].path;
//           for (let k = 0; k < nextSegment.length; k++) {
//             this.polyline.getPath().push(nextSegment[k]);
//             bounds.extend(nextSegment[k]);
//           }
//         }
//       }

//       this.polyline.setMap(this.map);

//       //to get distance
//       // response.routes[0].legs[0].distance.text
//     } else {
//       window.alert('Directions request failed due to ' + status);
//     }
//   }

//   initializeMap(location) {
//     this.map = new google.maps.Map(this.mapElement.nativeElement, {
//       zoom: 12,
//       center: location,
//       // mapTypeControlOptions: {
//       //   mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
//       //     'styled_map']
//       // }
//     });
//   }



//   styledMap() {
//     //Associate the styled map with the MapTypeId and set it to display.
//     this.map.mapTypes.set('styled_map', this.styledMapType);
//     this.map.setMapTypeId('styled_map');
//   }


//   watchLocation() {
//     this.geoLocation.watchLocation().subscribe((data) => {
//       this.onWatchSuccess(data)
//     });
//   }


//   onWatchSuccess(data) {
//     //this.deleteMarkers();
//     //this.updateGeolocation(this.uuid, data.coords.latitude, data.coords.longitude);
//     let updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);

//     var lastPosn = this.markers[0].getPosition();
//     var heading = google.maps.geometry.spherical.computeHeading(lastPosn, updatelocation);
//     this.icon.rotation = heading;
//     this.markers[0].setIcon(this.icon);
//     this.cords = data.coords.latitude + ',' + data.coords.longitude;
//     let image = 'assets/images/location-tracker.png';
//     this.markers[0].setDuration(2000);
//       this.markers[0].setEasing('linear');
//       // let bounds = new google.maps.LatLngBounds();
//       // bounds.extend(updatelocation);
//       // this.map.fitBounds(bounds);

//       this.markers[0].setPosition(updatelocation);

//       this.map.panTo(updatelocation);

//     //this.map.setCenter(updatelocation);
//   }

//   onError(error: any) {
//     switch (error.code) {
//       case error.PERMISSION_DENIED:
//         this.mapElement.nativeElement.innerHTML = "User denied the request for Geolocation."
//         break;
//       case error.POSITION_UNAVAILABLE:
//         this.mapElement.nativeElement.innerHTML = "Location information is unavailable."
//         break;
//       case error.TIMEOUT:
//         this.mapElement.nativeElement.innerHTML = "The request to get user location timed out."
//         break;
//       case error.UNKNOWN_ERROR:
//         this.mapElement.nativeElement.innerHTML = "An unknown error occurred."
//         break;
//     }
//   }

//   addMarker(location, image) {
//     var marker = new SlidingMarker({
//       position: location,
//       map: this.map,
//       title: 'i am title',
//       icon: image,
//       // icon: {
//       //   path: google.maps.SymbolPath.CIRCLE,
//       //   scale: 5,
//       // }
//     });
//     // let marker = new google.maps.Marker({
//     //   position: location,
//     //   map: this.map,
//     //   icon: image
//     // });
//     this.markers.push(marker);
//   }

//   setMapOnAll(map) {
//     for (var i = 0; i < this.markers.length; i++) {
//       this.markers[i].setMap(map);
//     }
//   }

//   clearMarkers() {
//     this.setMapOnAll(null);
//   }

//   deleteMarkers() {
//     this.clearMarkers();
//     this.markers = [];
//   }

//   updateGeolocation(uuid, lat, lng) {
//     if (localStorage.getItem('mykey')) {
//       firebase.database().ref('geolocations/' + localStorage.getItem('mykey')).set({
//         uuid: uuid,
//         latitude: lat,
//         longitude: lng
//       });
//     } else {
//       let newData = this.ref.push();
//       newData.set({
//         uuid: uuid,
//         latitude: lat,
//         longitude: lng
//       });
//       localStorage.setItem('mykey', newData.key);
//     }
//   }
}
