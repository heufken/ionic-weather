import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  favs: any[] = [];

  constructor() {}

  ngOnInit() {
    this.loadFavorites();
  }

  ionViewWillEnter() {
    this.loadFavorites(); // Pastikan data diperbarui saat tampilan dimasukkan kembali
  }

  loadFavorites() {
    const favData = localStorage.getItem('favs');
    if (favData) {
      this.favs = JSON.parse(favData);
    }
  }
}
