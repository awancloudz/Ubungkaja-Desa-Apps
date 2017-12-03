import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';
/*
  Generated class for the GoogleMapsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GoogleMapsProvider {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any;
  apiKey: string = "AIzaSyAoEA6pGHkDxYoTX2wFmQAE5X1Il5XtOc0";
 
  constructor(public connectivityService: ConnectivityServiceProvider, public geolocation: Geolocation) {
    this.markers = [];
  }
 
  init(mapElement: any, pleaseConnect: any): Promise<any> {
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
    return this.loadGoogleMaps();
  }
 
  loadGoogleMaps(): Promise<any> {
    return new Promise((resolve) => {
      if(typeof google == "undefined" || typeof google.maps == "undefined"){
        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();
        if(this.connectivityService.isOnline()){
          window['mapInit'] = () => { 
            this.initMap().then(() => {
              resolve(true);
            });
            this.enableMap();
          }
 
          let script = document.createElement("script");
          script.id = "googleMaps";
 
          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=places';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';      
          }
 
          document.body.appendChild(script); 
        }
      } else {
        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }
        resolve(true);
      }
      this.addConnectivityListeners();
    });
  }
 
  initMap(): Promise<any> {
    this.mapInitialised = true;
    return new Promise((resolve) => {
      //Geolocation
      this.geolocation.getCurrentPosition().then((position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeControl: false
        }
        //Buat Map
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        //Marker
        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });
        this.markers.push(marker);
        resolve(true);
      });
    });
  }
  //Reset Marker
  clearMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i])
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }
  //Nonaktif Map
  disableMap(): void {
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }
  }
  //Aktifkan Map
  enableMap(): void {
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
  }
  //Koneksi
  addConnectivityListeners(): void {
    this.connectivityService.watchOnline().subscribe(() => {
      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        }
        else {
          if(!this.mapInitialised){
            this.initMap();
          }
          this.enableMap();
        }
      }, 2000);
    });
    this.connectivityService.watchOffline().subscribe(() => {
      this.disableMap();
    });
  }
}
