import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../../core/services/weather.service';
import { WeatherResponse } from 'src/app/core/services/models/weather.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  weatherInfo?: WeatherResponse;
  canRefresh = true;
  remainingTime = 0;
  intervalId?: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    const saved = sessionStorage.getItem('weather');
    if (saved) {
      this.weatherInfo = JSON.parse(saved);
      this.canRefresh = false;

      // Espera 5 minutos para permitir nueva consulta
      setTimeout(() => {
        this.canRefresh = true;
      }, 5 * 60 * 1000); // 5 minutos
    }
  }

  retrieveData(): void {
    if (!this.canRefresh) return;
  
    this.weatherService.getWeather().subscribe((res) => {
      this.weatherInfo = res;
      sessionStorage.setItem('weather', JSON.stringify(res));
      this.canRefresh = false;
      this.remainingTime = 300; // 5 minutos en segundos
  
      // Timer
      this.intervalId = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime <= 0) {
          this.canRefresh = true;
          clearInterval(this.intervalId);
        }
      }, 1000);
    });
  }
  
}
