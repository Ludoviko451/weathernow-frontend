import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherModule } from '../weather/components/weather.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../../app.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    WeatherModule,
    HttpClientModule
  ],

  exports:[
    HomeComponent
  ],


})
export class PagesModule { }
