import { Component, OnInit } from '@angular/core';
import {MovieApiService} from '../movie-api.service';
import {Observable} from 'rxjs';
import {NavController} from '@ionic/angular';
import {Movie} from '../model/movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  MoviesList: any = [];
  document = document;
  movies = {
    upcoming: {
      results: []
    },
    top_rated: {
      results: []
    },
    popular: {
      results: []
    },
    now_playing: {
      results: []
    },
    All: this.MoviesList
  };
  filtered: any[] = [];
  constructor(
      private movieAPI: MovieApiService,
      private movieApiService: MovieApiService,
      private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.getMovie();
  }
  newSearch() {
    // @ts-ignore
    if (document.getElementById('searchBar').value === '') {
      // @ts-ignore
      this.searchByName();
    } else {
      // @ts-ignore
      this.movieAPI.searchMovie(document.getElementById('searchBar').value).subscribe(data => {
        this.filtered = data.results;
        console.log(data.results);
        // tslint:disable-next-line:prefer-for-of
        this.sortFiltered();
        this.removeDupes();
      });
    }
  }
  searchByName() {
    // @ts-ignore
    const category = this.movies.All;

    if (document.getElementById('searchBar')) {
      // @ts-ignore
      const Query = document.getElementById('searchBar').value;
      this.filtered = [];
      // @ts-ignore
      if (Query !== undefined && Query !== '') {
// tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < category.length; i++) {
          // @ts-ignore
          if (category[i].title.toLowerCase().includes(Query.toLowerCase())) {
            // @ts-ignore
            this.filtered.push(category[i]);
          } else {
            if (Query === '' || Query === null || Query === undefined) {
              this.resetQuery();
            }
          }
        }
      } else {
        this.filtered = this.movies.All;
      }
    }
  }
  resetQuery() {
    this.filtered = this.MoviesList;
  }
  getMovie() {
    this.movieAPI.dynamicMovieTypes('movie', 'upcoming').subscribe(data => {
      this.movies.upcoming = data;
      // console.log(data.results);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.movies.upcoming.results.length; i++) {
        this.MoviesList.push(this.movies.upcoming.results[i]);
      }
      this.removeDupes();
    });
    this.movieAPI.dynamicMovieTypes('movie', 'top_rated').subscribe(data => {
      this.movies.top_rated = data;
      // console.log(data.results);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.movies.top_rated.results.length; i++) {
        this.MoviesList.push(this.movies.top_rated.results[i]);
      }
      this.removeDupes();
    });
    this.movieAPI.dynamicMovieTypes('movie', 'popular').subscribe(data => {
      this.movies.popular = data;
      // console.log(data.results);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.movies.popular.results.length; i++) {
        this.MoviesList.push(this.movies.popular.results[i]);
      }
      this.removeDupes();
    });
    this.movieAPI.dynamicMovieTypes('movie', 'now_playing').subscribe(data => {
      this.movies.now_playing = data;
      // console.log(data.results);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.movies.now_playing.results.length; i++) {
        this.MoviesList.push(this.movies.now_playing.results[i]);
      }
      this.removeDupes();
      this.filtered = this.MoviesList;
      this.SortAlphabetically();

    });
  }
  SortAlphabetically() {
    this.MoviesList.sort((a, b) => {
      if (a.title < b.title) { return -1; }
      if (a.title > b.title) { return 1; }
      return 0;
    });
    this.movies.upcoming.results.sort((a, b) => {
      if (a.title < b.title) { return -1; }
      if (a.title > b.title) { return 1; }
      return 0;
    });
    this.movies.top_rated.results.sort((a, b) => {
      if (a.title < b.title) { return -1; }
      if (a.title > b.title) { return 1; }
      return 0;
    });
    this.movies.popular.results.sort((a, b) => {
      if (a.title < b.title) { return -1; }
      if (a.title > b.title) { return 1; }
      return 0;
    });
    this.movies.now_playing.results.sort((a, b) => {
      if (a.title < b.title) { return -1; }
      if (a.title > b.title) { return 1; }
      return 0;
    });
    this.removeDupes();
    this.movies.All = this.MoviesList;
    this.movies.All.sort((a, b) => {
      if (a.title < b.title) { return -1; }
      if (a.title > b.title) { return 1; }
      return 0;
    });
    console.log(this.MoviesList);
    this.searchByName();
  }
  sortFiltered() {
    this.filtered.sort((a, b) => {
      if (a.title < b.title) { return -1; }
      if (a.title > b.title) { return 1; }
      return 0;
    });
  }
  removeDupes() {
    this.MoviesList = Array.from(new Set(this.MoviesList.map(a => a.id)))
        .map(id => {
          return this.MoviesList.find(a => a.id === id);
        });
    this.movies.All = Array.from(new Set(this.MoviesList.map(a => a.id)))
        .map(id => {
          return this.MoviesList.find(a => a.id === id);
        });
  }
  movieClicked(movie: Movie) {
    this.movieApiService.movie = movie;
    this.navCtrl.navigateForward('movie-details');
  }
}
