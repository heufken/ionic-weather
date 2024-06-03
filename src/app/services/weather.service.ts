import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/';
  key = '87718251b7e8e5b953cce1e6bf2e0769';
  city = 'Sleman';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> { 
    return this.http.get(`${this.url}weather?q=${this.city}&appid=${this.key}&units=metric`);
  }

  getWeatherData3Hours(): Observable<any> {
    return this.http.get(`${this.url}forecast?q=${this.city}&appid=${this.key}&units=metric`)
      .pipe(
        map((data: any) => {
          // Filter data for the next 5 days with 3-hour interval starting from 00:00 each day
          const currentDate = new Date();
          const tomorrow = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0); // Tomorrow at 00:00
          const next5Days = [];
          for (let i = 0; i < 5; i++) {
            const nextDay = new Date(tomorrow.getTime() + i * 24 * 60 * 60 * 1000); // Next day
            for (let j = 0; j < 8; j++) {
              const hour = j * 3; // Hour offset (0, 3, 6, 9, ...)
              const dateTime = new Date(nextDay.getTime() + hour * 60 * 60 * 1000);
              const filteredData = data.list.filter((item: any) => {
                const itemDate = new Date(item.dt * 1000); // Convert timestamp to Date object
                return itemDate >= dateTime && itemDate < new Date(dateTime.getTime() + 3 * 60 * 60 * 1000); // Data within 3-hour interval
              });
              next5Days.push(...filteredData);
            }
          }
          return next5Days;
        })
      );
  }

  getWeatherData5Days(): Observable<any> {
    return this.http.get(`${this.url}forecast?q=${this.city}&appid=${this.key}&units=metric`)
      .pipe(
        map((data: any) => {
          // Filter data for every day
          return data.list.filter((item: any, index: number) => index % 8 === 0);
        })
      );
  }
}
