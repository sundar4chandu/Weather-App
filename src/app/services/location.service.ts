import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getCurrentPosition(): Promise<any> {
    console.log('calling location service')
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((res : GeolocationPosition) => {
        resolve({ lng: res.coords.longitude, lat: res.coords.latitude });
      },err => {
        reject(err);
      });
    });
  }
}
