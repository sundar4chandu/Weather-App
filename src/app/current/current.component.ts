import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { WeatherService } from '../services/weather.service';
import { ICurrent } from '../shared/i-current';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {

  public location: string = '';
  public weather: any;
  public imgSrc: string = '';
  public wind = {
    units: 'm'
  }
  public errorMsg = '';
  constructor(private weatherService: WeatherService,
    private locationService: LocationService
  ) {
  }

  ngOnInit() {
    this.getCurrentTemp();
  }

  getCurrentTemp() {
    this.locationService.getCurrentPosition().then(location => {
      this.weatherService.getCurrentTemp(location.lat, location.lng).subscribe((res: ICurrent) => {
        this.weather = res;
        this.weather.weather[0].icon = 'http://openweathermap.org/img/w/' + res.weather[0].icon + '.png';
      });
    }).catch(err => {
      const alertMsg = 'Please allow location access.';
      window.alert(alertMsg);
      this.errorMsg = 'User location is currently unavailable. Please turn on location services.';
    });
  }

}
