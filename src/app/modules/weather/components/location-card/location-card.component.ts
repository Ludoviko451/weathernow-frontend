import { Component, Input } from '@angular/core';
import { WeatherLocation } from 'src/app/core/services/models/weather.interface';
import * as countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json'; // Si ya activaste resolveJsonModule

// Registra el locale para que los nombres de los países se puedan traducir
countries.registerLocale(en);

@Component({
  selector: 'app-location-card',
  standalone: false,
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss']
})
export class LocationCardComponent {
  @Input() location?: WeatherLocation;

  getCountryCode(countryName: string | undefined): string {
    if (!countryName) {
      return 'unknown';  
    }
    const code = countries.getAlpha2Code(countryName, 'en');
  
    return code ? code.toLowerCase() : 'unknown';
  }
  
}
