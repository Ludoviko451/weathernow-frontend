import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { WeatherService } from 'src/app/core/services/weather.service';
import { WeatherResponse } from 'src/app/core/services/models/weather.interface';
import { TranslateModule } from '@ngx-translate/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockWeatherResponse: WeatherResponse = {
  location: {
    name: "Lima",
    region: "Lima",
    country: "Peru",
    lat: -12.0464,
    lon: -77.0428,
    tz_id: "America/Lima",
    localtime_epoch: 1615124735,
    localtime: "2025-04-17 10:45",
  },
  current: {
    last_updated_epoch: 1615124735,
    last_updated: "2025-04-17 10:45",
    temp_c: 25,
    temp_f: 77,
    is_day: 1,
    condition: {
      text: "Sunny",
      icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
      code: 1000,
    },
  },
};

  const mockWeatherService = {
    getWeather: () => of(mockWeatherResponse),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, TranslateModule.forRoot()],
      declarations: [HomeComponent],
      providers: [{ provide: WeatherService, useValue: mockWeatherService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load data from sessionStorage', () => {
    const data = JSON.stringify(mockWeatherResponse);
    sessionStorage.setItem('weather', data);
    component.ngOnInit();
    expect(component.weatherInfo).toEqual(mockWeatherResponse);
  })

  it('should simulate interval', fakeAsync(() => {
    component.ngOnInit();
    tick(5 * 60 * 1000);
    expect(component.canRefresh).toBeTrue();
  }));
  
  it('should retrieve data and simulate interval', fakeAsync(() => {
    component.canRefresh = true;
    spyOn(mockWeatherService, 'getWeather').and.returnValue(of(mockWeatherResponse));
    
    component.retrieveData();

    expect(component.weatherInfo).toEqual(mockWeatherResponse);
    expect(sessionStorage.getItem('weather')).toEqual(JSON.stringify(mockWeatherResponse));
    expect(component.canRefresh).toBeFalse();

    tick(300 * 1000);  

    expect(component.canRefresh).toBeTrue();
  }));

  it('should display error message', () => {
    
    spyOn(mockWeatherService, 'getWeather').and.returnValue(throwError(() => new Error('Something went wrong')));
    component.retrieveData();
    fixture.detectChanges();
    expect(component.errorMessage).toBeTrue();
  });
  
});
