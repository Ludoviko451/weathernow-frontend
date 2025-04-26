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

  // Método para obtener el código de país a partir del nombre del país
  getCountryCode(countryName: string | undefined): string {
    if (!countryName) {
      return 'unknown';  // Retorna un valor predeterminado si countryName es undefined
    }
    const code = countries.getAlpha2Code(countryName, 'en');
    console.log(code)
    return code ? code.toLowerCase() : 'unknown';
  }
  
}
