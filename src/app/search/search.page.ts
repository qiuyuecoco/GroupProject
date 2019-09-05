import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  movies = ['Endgame', 'Brightburn', 'Spiderverse'];
  filtered = [];
  constructor() { }

  ngOnInit() {
    this.filtered = this.movies;
  }

  searchByName() {
    // @ts-ignore
    const Query = document.getElementById('searchBar').value;
    this.filtered = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.movies.length; i++) {
      console.log(this.movies[i]);
      if (this.movies[i].includes(Query)) {
        this.filtered.push(this.movies[i]);
      } else {
        if (Query === '') {
          this.resetQuery();
        }
      }
    }
  }
  resetQuery() {
    this.filtered = this.movies;
  }

}
