import { Component, OnInit } from '@angular/core';
import {MovieApiService} from '../movie-api.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  // @ts-ignore
  movies = {
    results: ['']
  };
  filtered: any[] = [];
  constructor(private movieAPI: MovieApiService) { }

  ngOnInit() {
    this.getMovie();
  }
  searchByName() {
    if (document.getElementById('searchBar')) {
      // @ts-ignore
      const Query = document.getElementById('searchBar').value;
      this.filtered = [];
      // @ts-ignore
      if (Query !== undefined) {
// tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.movies.results.length; i++) {
          // @ts-ignore
          if (this.movies.results[i].title.toLowerCase().includes(Query.toLowerCase())) {
            // @ts-ignore
            this.filtered.push(this.movies.results[i]);
          } else {
            if (Query === '' || Query === null || Query === undefined) {
              this.resetQuery();
            }
          }
        }
      } else {
        this.filtered = this.movies.results;
      }
    }
  }
  resetQuery() {
    this.filtered = this.movies.results;
  }
  getMovie() {
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.movieAPI.dynamicMovieTypes('movie', 'top_rated').subscribe(data => { this.movies = data; console.log(data.results); this.filtered = this.movies.results; });
    this.resetQuery();
    this.filtered = this.movies.results;
    // this.filtered = this.movies;
    // this.movieAPI.dynamicMovieSearch('movie', document.getElementById('searchBar').value.toLowerCase(), '&language=en-US');
  }
}
