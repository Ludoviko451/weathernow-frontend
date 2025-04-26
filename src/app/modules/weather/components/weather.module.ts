import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { LocationCardComponent } from './location-card/location-card.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [    
    WeatherCardComponent,
    LocationCardComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],

  exports:[
    WeatherCardComponent,
    LocationCardComponent
  ]
})
export class WeatherModule { }
