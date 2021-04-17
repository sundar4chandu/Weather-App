import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICurrent } from '../shared/i-current';
import { IForecast } from '../shared/i-forecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '485aadc24a72037f4b275f596b02d236';
  private currentTempUrl = 'https://api.openweathermap.org/data/2.5/weather?';
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?';

  private units = 'imperial';

  constructor(private http: HttpClient) { }

  getCurrentTemp(lat: string, lon: string) {
    let params = 'units=' + this.units +
      '&lat=' + lat +
      '&lon=' + lon +
      '&APPID=' + this.apiKey;
    return this.http.get<ICurrent>(this.currentTempUrl + params);
  }

  getweatherForecast(lat:string, lon:string) {
    let params = 'units=' + this.units +
      '&lat=' + lat +
      '&lon=' + lon +
      '&APPID=' + this.apiKey;
    return this.http.get<IForecast>(this.forecastUrl + params);
  }
}
