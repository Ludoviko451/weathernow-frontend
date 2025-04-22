import { Component, Input } from '@angular/core';
import { WeatherLocation } from 'src/app/core/services/models/weather.interface';

@Component({
  selector: 'app-location-card',
  standalone: false,
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss']
})
export class LocationCardComponent {
  @Input()location?: WeatherLocation ;
    
}
