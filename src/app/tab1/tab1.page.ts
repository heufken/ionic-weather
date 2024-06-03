
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

export interface WeatherData {
  main: {
    temp: number;
  };
  name: string;
  weather: {
    description: string;
    icon: string;
  }[];
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public weather: WeatherData = { main: { temp: 0 }, name: '', weather: [] }; 
  public temp: number = 0;
  public city: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getData().subscribe(
      (result: WeatherData) => {
        this.weather = result;
        this.temp = result.main.temp;
        this.city = result.name;
        console.log(this.weather);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }
}
