import { Component } from '@angular/core';
import { WeatherService } from '../../../core/services/weather.service';
import { WeatherResponse } from 'src/app/core/services/models/weather.interface';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    weatherInfo?: WeatherResponse;
    constructor(private weatherService: WeatherService){}

    retrieveData(){
      this.weatherService.getWeather().subscribe((res) =>{
        this.weatherInfo =res;
      })
    }
}
