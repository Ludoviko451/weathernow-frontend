import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroments';
import { WeatherResponse } from './models/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private api = environment.weatherApi;

  constructor(private http: HttpClient) { }

  getWeather(): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(this.api);
  }
  
}
