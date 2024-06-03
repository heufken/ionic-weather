import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  weather: any; // Definisikan properti weather

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      if (params && params['special']) {
        // Akses 'special' menggunakan ['special']
        this.weather = JSON.parse(params['special']); // Akses 'special' menggunakan ['special']
      }
    });
  }

  save() {
    const favs = JSON.parse(localStorage.getItem('favs') ?? '[]');
    favs.push(this.weather);
    localStorage.setItem('favs', JSON.stringify(favs));
  }

  ngOnInit() {}
}
