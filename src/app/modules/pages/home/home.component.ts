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
  errorMessage = false;
  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {
    const savedWeather = sessionStorage.getItem('weather');
    const savedTime = sessionStorage.getItem('remainingTime');
    const savedCanRefresh = sessionStorage.getItem('canRefresh');
  
    if (savedWeather) {
      this.weatherInfo = JSON.parse(savedWeather);
      this.canRefresh = savedCanRefresh === 'true';  // Convertir de string a boolean
      this.remainingTime = savedTime ? +savedTime : 0; // Asegúrate de convertir el valor a número
    }
  
    if (!this.canRefresh) {
      this.startCountdown();
    }
  }
  
  retrieveData(): void {
    if (!this.canRefresh) return;
  
    this.weatherService.getWeather().subscribe((res) => {
      this.errorMessage = false;
      this.weatherInfo = res;
      sessionStorage.setItem('weather', JSON.stringify(res));
      this.canRefresh = false;
      this.remainingTime = 300;
  
      // Guardar estado en sessionStorage
      sessionStorage.setItem('remainingTime', this.remainingTime.toString());
      sessionStorage.setItem('canRefresh', 'false');
  
      this.startCountdown();
    }, (err) => {
      console.log(err.status);
      this.errorMessage = true;
    });
  }
  
  startCountdown() {
    this.intervalId = setInterval(() => {
      this.remainingTime--;
      sessionStorage.setItem('remainingTime', this.remainingTime.toString()); // Guardar cada segundo
      if (this.remainingTime <= 0) {
        this.canRefresh = true;
        sessionStorage.setItem('canRefresh', 'true');
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

}  