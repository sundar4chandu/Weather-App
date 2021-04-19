import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { WeatherService } from '../services/weather.service';
import { ICurrent } from '../shared/i-current';
import { IForecast } from '../shared/i-forecast';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {


  public weatherForecast: any;
  public errorMsg: string = '';
  public forecast: any = [];
  public iconUrl = 'http://openweathermap.org/img/wn/';
  public selectedWeather: any;
  public tableView = true;

  constructor(private locationService: LocationService,
              private weatherService: WeatherService,
              private dateFilter: DatePipe
  ) {
  }

  ngOnInit() {
    this.getWeatherForecast();
  }

  getWeatherForecast() {
    this.locationService.getCurrentPosition().then(location => {
      this.weatherService.getweatherForecast(location.lat, location.lng).subscribe((res: IForecast) => {
        this.weatherForecast = res;
        this.setTableData(res.list);
      });
    }).catch(() => {
      const alertMsg = 'Please allow location access.';
      window.alert(alertMsg);
      this.errorMsg = 'User location is currently unavailable. Please turn on location services.'
    });
  }

  setTableData(data: ICurrent[]) {
    let dates: any[] = [];
    data.forEach(element => {
      const date = this.dateFilter.transform(element.dt * 1000, 'MMM d');
      if (dates.indexOf(date) !== -1) {
        this.forecast[dates.indexOf(date)].push(element);
      } else {
        dates.push(date);
        this.forecast[dates.indexOf(date)] = [];
        this.forecast[dates.indexOf(date)].push(element);
      }
    });
    console.log(data);
    if(this.forecast[this.forecast.length - 1].length !== 8){
      for (let i = 0; i < this.forecast[this.forecast.length - 1].length; i++) {
        this.forecast[0].unshift('');
      }
    }
    console.log(this.forecast);
    this.selectedWeather = this.weatherForecast.list[0];
  }

  selectWeather(item: ICurrent) {
    this.selectedWeather = item;
  }

  toggleView() {
    this.tableView = !this.tableView;
  }
}
