import { Component, Input } from '@angular/core';
import { WeatherResponse } from 'src/app/core/services/models/weather.interface';

@Component({
  selector: 'app-weather-card',
  standalone: false,
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent {
    @Input()weather?: WeatherResponse ;
      
}
