import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeolocationService } from '../../../shared/services/geo-location.service';
import { updateLocale } from 'ngx-bootstrap/chronos/locale/locales';
/// <reference path='./marker-animate-unobtrusive.d.ts' />
declare var google: any;
declare var SlidingMarker: any;

@Component({
  selector: 'cupcake-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  destLocation = 'begumpet, hyderabad';
  map: any;
  options: any;
  overlays: any[];
  title = 'cupcake';
  markers = [];
  //ref = firebase.database().ref('geolocations/');
  uuid = '11cfa37d-337b-92d3-da18-c1988bbbed31'; // UUID.UUID();
  items: Observable<any[]>;
  users = [];
  estimatedTravelTime = 'checking...';
  cords: string; // just for logging
  heading;
  polyline = [];
  wayPointLocation: any;
  sourceLocation: any;
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
  // car = `M673.952,633.159C698.507,633.159,718.427,613.336,718.427,588.781C718.427,588.781,718.427,45.623,718.427,45.623C718.395,21.132,698.476,1.245,673.952,1.245C673.952,1.245,347.572,1.245,347.572,1.245C323.048,1.245,303.161,21.132,303.161,45.623C303.161,45.623,303.161,588.781,303.161,588.781C303.161,613.336,323.048,633.159,347.572,633.159C347.572,633.159,673.952,633.159,673.952,633.159C673.952,633.159,673.952,633.159,673.952,633.159M633.187,567.487C652.019,567.487,667.334,550.094,667.334,528.608C667.334,528.608,667.334,102.311,667.334,102.311C667.334,80.889,652.019,63.464,633.187,63.464C633.187,63.464,386.131,63.464,386.131,63.464C367.267,63.464,351.984,80.889,351.984,102.311C351.984,102.311,351.984,528.608,351.984,528.608C351.984,550.094,367.267,567.487,386.131,567.487C386.131,567.487,633.187,567.487,633.187,567.487C633.187,567.487,633.187,567.487,633.187,567.487M511.625,63.432C511.625,63.432,386.131,63.432,386.131,63.432C367.267,63.432,351.984,80.857,351.984,102.279C351.984,102.279,351.984,528.576,351.984,528.576C351.984,550.062,367.267,567.455,386.131,567.455C386.131,567.455,510.634,567.455,510.634,567.455M655.855,1025.245C680.379,1025.245,718.043,1005.357,718.043,980.834C718.043,980.834,718.043,708.424,718.043,708.424C718.043,683.869,698.156,664.013,673.6,664.013C673.6,664.013,351.632,664.013,351.632,664.013C327.077,664.013,307.222,683.869,307.222,708.424C307.222,708.424,307.222,971.882,307.222,971.882C307.222,996.437,329.795,1019.266,360.521,1025.213C360.521,1025.213,655.855,1025.213,655.855,1025.213C655.855,1025.213,655.855,1025.245,655.855,1025.245M635.904,836.668C659.468,836.668,657.23,817.58,657.23,794.016C657.23,794.016,657.23,743.562,657.23,743.562C657.23,719.998,659.436,700.846,635.904,700.846C635.904,700.846,393.421,700.846,393.421,700.846C369.857,700.846,363.526,707.145,363.526,730.773C363.526,730.773,363.526,811.121,363.526,811.121C363.526,834.685,369.825,836.7,393.421,836.7C393.421,836.7,635.904,836.7,635.904,836.7C635.904,836.7,635.904,836.668,635.904,836.668M570.871,801.465C582.19,801.465,581.103,792.289,581.103,780.939C581.103,780.939,581.103,756.607,581.103,756.607C581.103,745.257,582.19,736.049,570.871,736.049C570.871,736.049,454.074,736.049,454.074,736.049C442.723,736.049,439.686,739.086,439.686,750.437C439.686,750.437,439.686,789.092,439.686,789.092C439.686,800.442,442.723,801.433,454.074,801.433C454.074,801.433,570.871,801.433,570.871,801.433C570.871,801.433,570.871,801.465,570.871,801.465M320.554,724.73C320.554,724.73,347.923,732.148,347.923,732.148C347.923,732.148,347.188,837.211,347.188,837.211C347.188,837.211,322.025,873.501,322.025,873.501C322.025,873.501,320.554,724.73,320.554,724.73M703.208,724.73C703.208,724.73,675.807,732.148,675.807,732.148C675.807,732.148,676.542,837.211,676.542,837.211C676.542,837.211,701.705,873.501,701.705,873.501C701.705,873.501,703.208,724.73,703.208,724.73M355.341,850.544C355.341,850.544,335.358,892.748,335.358,892.748C335.358,892.748,377.53,936.36,505.582,931.979C505.582,931.979,642.491,940.1,690.642,892.748C690.642,892.748,671.362,850.544,671.362,850.544C671.362,850.544,614.418,869.792,496.726,865.38C496.726,865.38,373.821,866.147,355.341,850.544C355.341,850.544,355.341,850.544,355.341,850.544M308.341,874.236C313.456,874.236,317.581,870.112,317.581,865.028C317.581,865.028,317.581,865.028,317.581,865.028C317.581,859.912,313.456,855.756,308.341,855.756C308.341,855.756,276.496,855.756,276.496,855.756C271.412,855.756,267.255,859.912,267.255,865.028C267.255,865.028,267.255,865.028,267.255,865.028C267.255,870.112,271.412,874.236,276.496,874.236C276.496,874.236,308.341,874.236,308.341,874.236C308.341,874.236,308.341,874.236,308.341,874.236M749.504,874.236C754.588,874.236,758.745,870.112,758.745,865.028C758.745,865.028,758.745,865.028,758.745,865.028C758.745,859.912,754.588,855.756,749.504,855.756C749.504,855.756,717.659,855.756,717.659,855.756C712.544,855.756,708.387,859.912,708.387,865.028C708.387,865.028,708.387,865.028,708.387,865.028C708.387,870.112,712.544,874.236,717.659,874.236C717.659,874.236,749.504,874.236,749.504,874.236C749.504,874.236,749.504,874.236,749.504,874.236M367.555,990.618C404.611,990.618,427.76,1002.352,409.216,1011.72C400.647,1016.068,384.756,1018.754,367.555,1018.754C330.498,1018.754,307.35,1007.02,325.894,997.652C334.463,993.304,350.353,990.618,367.555,990.618M659.5,990.49C696.525,990.49,719.642,1002.192,701.161,1011.528C692.56,1015.877,676.67,1018.562,659.5,1018.562C622.476,1018.562,599.359,1006.86,617.84,997.524C626.44,993.176,642.331,990.49,659.5,990.49M496.726,865.38C496.726,865.38,373.853,866.115,355.341,850.544C355.341,850.544,335.358,892.748,335.358,892.748C335.358,892.748,377.53,936.36,505.582,931.979M675.807,732.148C675.807,732.148,676.542,837.211,676.542,837.211C676.542,837.211,701.705,873.501,701.705,873.501M348.307,730.997C348.307,730.997,347.54,836.156,347.54,836.156C347.54,836.156,322.409,872.382,322.409,872.382M414.619,1014.63C416.218,1007.02,396.458,996.437,370.464,990.906C344.47,985.438,322.089,987.165,320.49,994.774M612.436,1014.438C610.869,1006.86,630.629,996.245,656.591,990.778C682.585,985.278,704.998,986.973,706.597,994.583M391.279,618.228C391.279,618.228,606.105,618.228,606.105,618.228C606.105,618.228,606.105,670.696,606.105,670.696C606.105,670.696,391.279,670.696,391.279,670.696C391.279,670.696,391.279,618.228,391.279,618.228`;
  // car = `M21.474,377.522V117.138c0-14.469,11.729-26.199,26.199-26.199h260.25c14.469,0,26.198,11.73,26.198,26.199v260.385
  //       c0,4.823-3.909,8.733-8.733,8.733H30.207C25.383,386.256,21.474,382.346,21.474,377.522z M231.634,466.724
  //       c0,30.01-24.329,54.338-54.338,54.338c-30.009,0-54.338-24.328-54.338-54.338c0-30.011,24.329-54.338,54.338-54.338
  //       C207.305,412.386,231.634,436.713,231.634,466.724z M204.464,466.724c0-15.005-12.164-27.169-27.169-27.169
  //       s-27.17,12.164-27.17,27.169s12.165,27.17,27.17,27.17S204.464,481.729,204.464,466.724z M130.495,412.385H8.733
  //       c-4.823,0-8.733,3.91-8.733,8.733v26.495c0,4.823,3.91,8.733,8.733,8.733h97.598C108.879,438.862,117.704,423.418,130.495,412.385z
  //       M515.938,466.724c0,30.01-24.329,54.338-54.338,54.338c-30.01,0-54.338-24.328-54.338-54.338
  //       c0-30.011,24.328-54.338,54.338-54.338C491.609,412.385,515.938,436.713,515.938,466.724z M488.77,466.724
  //       c0-15.005-12.165-27.169-27.17-27.169c-15.006,0-27.169,12.164-27.169,27.169s12.164,27.17,27.169,27.17
  //       S488.77,481.729,488.77,466.724z M612,421.118v26.495c0,4.823-3.91,8.733-8.733,8.733h-70.704
  //       c-5.057-34.683-34.906-61.427-70.961-61.427c-36.062,0-65.912,26.745-70.969,61.427H248.261
  //       c-2.549-17.483-11.373-32.928-24.164-43.961h134.994V162.594c0-9.646,7.82-17.466,17.466-17.466h82.445
  //       c23.214,0,44.911,11.531,57.9,30.77l53.15,78.721c7.796,11.547,11.962,25.161,11.962,39.094v118.672h21.253
  //       C608.09,412.385,612,416.295,612,421.118z M523.408,256.635l-42.501-60.393c-1.636-2.324-4.3-3.707-7.142-3.707H407.47
  //       c-4.822,0-8.733,3.91-8.733,8.733v60.393c0,4.824,3.91,8.733,8.733,8.733h108.798C523.342,270.394,527.48,262.421,523.408,256.635z`;
  icon = {
    path: this.car,
    scale: 0.035,
    strokeColor: 'black',
    strokeWeight: .10,
    fillOpacity: 1,
    fillColor: '#094F7F',
    offset: '5%',
    rotation: 45, // parseInt(heading[i]),
    anchor: new google.maps.Point(10, 25) // orig 10,50 back of car, 10,0 front of car, 10,25 center of car
  };

  styledMapType = new google.maps.StyledMapType(
    [
      {
        'featureType': 'landscape.natural',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'visibility': 'on'
          },
          {
            'color': '#e0efef'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'visibility': 'on'
          },
          {
            'hue': '#1900ff'
          },
          {
            'color': '#c0e8e8'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': [
          {
            'lightness': 100
          },
          {
            'visibility': 'simplified'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'transit.line',
        'elementType': 'geometry',
        'stylers': [
          {
            'visibility': 'on'
          },
          {
            'lightness': 700
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#7dcdcd'
          }
        ]
      }
    ],
    { name: 'Styled Map' });

    constructor(//afDb: AngularFireDatabase,
      private geoLocation: GeolocationService) {
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
      this.watchLocation();
    });
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
      // waypoints: wayPts,
      travelMode: google.maps.TravelMode.DRIVING,
      //provideRouteAlternatives: true,
      drivingOptions: { // will work with premium licence
        departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
        trafficModel: 'optimistic'
      }
    }, this.onDirectionSuccess.bind(this, directionsDisplay));

    // directionsService.route({
    //   origin: mylocation,
    //   destination: this.destLocation,
    //   travelMode: 'DRIVING',
    //   drivingOptions: {
    //     departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
    //     trafficModel: 'bestguess'
    //   }
    // }, this.onDirectionSuccess.bind(this, directionsDisplay));
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
      let color = '#0000FF';
      response.routes.forEach((route, index) => {
        if (index === 1) {
          color = '#62666b';
        } else if (index === 2) {
          color = '#62666b';
        }

        this.polyline.push(new google.maps.Polyline({
          path: [],
          strokeColor: color,
          strokeWeight: 5
        }));
      });
      response.routes.forEach((route, index) => {
        if (index !== 11) {
          this.estimatedTravelTime = route.legs[0].duration.text;
          let travelTime = this.estimatedTravelTime;

          directionsDisplay.setDirections(response);

          // if (this.polyline) {
          //   this.polyline.setMap(null);
          // }
          // to get duraiton

          const bounds = new google.maps.LatLngBounds();

          const legs = route.legs;
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

          google.maps.event.addListener(this.polyline[index], 'click', (function (poly, map) {
            // poly.strokeColor = '#0000FF';
            // poly.setMap(map);

            return function (event) {
              //poly.setMap(map);
              infowindow.setContent(travelTime);
              infowindow.setPosition(event.latLng);
              infowindow.open(this.map);
              poly.setOptions({ strokeColor: 'black' });
            };
          })(this.polyline[index], this.map));


          // google.maps.event.addListener(this.map, 'click', (function (poly, map) {
          //   // poly.strokeColor = '#0000FF';
          //   // poly.setMap(map);

          //   return function (event) {
          //     if (google.maps.geometry.poly.isLocationOnEdge(event.latLng, poly, 0.0001)) {

          //     }
          //   };
          // })(this.polyline[index], this.map));



          // const startLoc = route.legs["0"].start_location;
          // const endLoc = route.legs["0"].end_location;
          // const inBetween = google.maps.geometry.spherical.interpolate(startLoc, endLoc, 0.5);
          // infowindow.content = 'travel time will be ' + this.estimatedTravelTime;
          // infowindow.position = inBetween;
          // infowindow.open(this.map);
        }
      });

      // to get distance
      // response.routes[0].legs[0].distance.text
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  }

  initializeMap(location) {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 12,
      center: location,
      mapTypeId: google.maps.MapTypeId.ROADMAP
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


  watchLocation() {
    this.geoLocation.watchLocation().subscribe(
      (data) => {
        const updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
        //if (google.maps.geometry.poly.isLocationOnEdge(updatelocation, this.polyline[0], 0.0001)) {
          console.log("in line");
          this.onWatchSuccess(data);
        //} else {
        //  this.wayPointLocation = updatelocation;
          //this.reRoute();
      // }
      },
      err => {
        this.onError(err);
      }
    );
  }


  onWatchSuccess(data) {
    // this.deleteMarkers();
    // this.updateGeolocation(this.uuid, data.coords.latitude, data.coords.longitude);
    const updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);


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

  addMarker(location, image) {
    const marker = new SlidingMarker({
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
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }

    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  updateGeolocation(uuid, lat, lng) {
    // if (localStorage.getItem('mykey')) {
    //   firebase.database().ref('geolocations/' + localStorage.getItem('mykey')).set({
    //     uuid: uuid,
    //     latitude: lat,
    //     longitude: lng
    //   });
    // } else {
    //   const newData = this.ref.push();
    //   newData.set({
    //     uuid: uuid,
    //     latitude: lat,
    //     longitude: lng
    //   });
    //   localStorage.setItem('mykey', newData.key);
    // }
  }

}
