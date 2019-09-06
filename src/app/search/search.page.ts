import { Component, OnInit } from '@angular/core';
import {MovieApiService} from '../movie-api.service';
import {Observable} from 'rxjs';
import {NavController} from "@ionic/angular";
import {Movie} from "../model/movie";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  // @ts-ignore
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
    latest: {
      results: []
    }
  };
  MoviesList: any = [];
  filtered: any[] = [];
  constructor(
      private movieAPI: MovieApiService,
      private movieApiService: MovieApiService,
      private navCtrl: NavController,
  ) { }

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
        for (let i = 0; i < this.MoviesList.length; i++) {
          // @ts-ignore
          if (this.MoviesList[i].title.toLowerCase().includes(Query.toLowerCase())) {
            // @ts-ignore
            this.filtered.push(this.MoviesList[i]);
          } else {
            if (Query === '' || Query === null || Query === undefined) {
              this.resetQuery();
            }
          }
        }
      } else {
        this.filtered = this.MoviesList;
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
    // this.movieAPI.dynamicMovieTypes('movie', 'latest').subscribe(data => {
    //   this.movies.latest = data;
    //   console.log(data.results);
    //   // tslint:disable-next-line:prefer-for-of
    //   for (let i = 0; i < this.movies.latest.results.length; i++) {
    //     this.MoviesList.push(this.movies.latest.results[i]);
    //   }
    //   this.filtered = this.MoviesList;
    // });
    // this.filtered = this.MoviesList;
  }
  SortAlphabetically() {
    this.MoviesList.sort((a, b) => {
      if (a.title < b.title) { return -1; }
      if (a.title > b.title) { return 1; }
      return 0;
    });
    console.log(this.MoviesList);
    this.searchByName();
  }
  removeDupes() {
    this.MoviesList = Array.from(new Set(this.MoviesList.map(a => a.id)))
        .map(id => {
          return this.MoviesList.find(a => a.id === id);
        });
  }
  movieClicked(movie: Movie) {
    this.movieApiService.movie = movie;
    this.navCtrl.navigateForward('movie-details');
  }
}
