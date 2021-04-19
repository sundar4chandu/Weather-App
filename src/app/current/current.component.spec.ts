import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { ForecastComponent } from '../forecast/forecast.component';
import { LocationService } from '../services/location.service';
import { WeatherService } from '../services/weather.service';

import { CurrentComponent } from './current.component';

describe('CurrentComponent', () => {
  let component: CurrentComponent;
  let fixture: ComponentFixture<CurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule, HttpClientTestingModule],
      declarations: [ CurrentComponent, AppComponent, ForecastComponent ],
      providers: [HttpTestingController, LocationService, WeatherService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    fixture = TestBed.createComponent(CurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call get temperature function', () => {
    fixture = TestBed.createComponent(CurrentComponent);
    component = fixture.componentInstance;
    spyOn(component,'getCurrentTemp').and.callThrough();

    component.ngOnInit();

    fixture.detectChanges();

    expect(component.getCurrentTemp).toHaveBeenCalled();
  });
});
