import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { of } from 'rxjs';
import { ICurrent } from '../shared/i-current';

describe('WeatherService', () => {
  let service: WeatherService;

  const currentWeather: ICurrent = {
    "coord": {
      "lon": -122.08,
      "lat": 37.39
    },
    "weather": [
      {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 282.55,
      "feels_like": 281.86,
      "temp_min": 280.37,
      "temp_max": 284.26,
      "pressure": 1023,
      "humidity": 100
    },
    "visibility": 16093,
    "wind": {
      "speed": 1.5,
      "deg": 350
    },
    "clouds": {
      "all": 1
    },
    "dt": 1560350645,
    "sys": {
      "type": 1,
      "id": 5122,
      "message": 0.0139,
      "country": "US",
      "sunrise": 1560343627,
      "sunset": 1560396563
    },
    "timezone": -25200,
    "id": 420006353,
    "name": "Mountain View",
    "cod": 200
  }

  const forecastWeather = {
    "cod": "200",
    "message": 0,
    "cnt": 40,
    "list": [ currentWeather ],
    "city": {
      "id": 2643743,
      "name": "London",
      "coord": {
        "lat": 51.5073,
        "lon": -0.1277
      },
      "country": "GB",
      "timezone": 0,
      "sunrise": 1578384285,
      "sunset": 1578413272
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    }); service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get current temperature should return observable', () => {
    spyOn(service, 'getCurrentTemp').and.returnValue(of(currentWeather));

    service.getCurrentTemp(43.2342, -81.1231).subscribe(res => {
      let response = res;
      expect(response).toEqual(currentWeather);
    });
  });

  it('get weather forecast should return array', () => {
    spyOn(service, 'getweatherForecast').and.returnValue(of(forecastWeather));

    service.getweatherForecast(43.2342, -81.1231).subscribe(res => {
      let response = res;
      expect(response.list.length).toEqual(forecastWeather.list.length);
    });
  });
});
