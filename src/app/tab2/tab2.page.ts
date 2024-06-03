import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public weatherData3Hours: any; // Data cuaca dalam 3 jam
  public weatherData5Days: any; // Data cuaca dalam 5 hari

  constructor(private weatherService: WeatherService, private router: Router) {}

  ngOnInit(): void {
    this.getWeatherData3Hours();
    this.getWeatherData5Days();
  }

  getWeatherData3Hours() {
    this.weatherService.getWeatherData3Hours().subscribe((data) => {
      this.weatherData3Hours = data;
      console.log('Weather Data in 3 hours:', this.weatherData3Hours);
    });
  }

  getWeatherData5Days() {
    this.weatherService.getWeatherData5Days().subscribe((data) => {
      this.weatherData5Days = data;
      console.log('Weather Data in 5 days:', this.weatherData5Days);
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Mendapatkan hari dan menambahkan leading zero jika hanya satu digit

    // Array dengan nama bulan untuk mengganti nomor bulan
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
                         "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];

    const monthIndex = date.getMonth(); // Mendapatkan indeks bulan
    const month = monthNames[monthIndex]; // Mendapatkan nama bulan dari array

    const year = date.getFullYear().toString(); // Mendapatkan tahun
    const hours = date.getHours().toString().padStart(2, '0'); // Mendapatkan jam dan menambahkan leading zero jika hanya satu digit
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Mendapatkan menit dan menambahkan leading zero jika hanya satu digit
  
    return `${day}/${month}/${year} ${hours}:${minutes}`; // Menggabungkan hari, bulan, tahun, jam, dan menit dengan spasi di antaranya
}

  detailpage(w: any): void {
    let weather = {
      date: w.dt_txt,
      temp: w.main.temp,
      main: w.weather[0].main,
      desc: w.weather[0].description,
      icon: w.weather[0].icon
    };
    let extras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(weather)
      }
    };
    this.router.navigate(['/detail'], extras);
  }
}
