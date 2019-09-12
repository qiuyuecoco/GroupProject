import { Component, OnInit } from '@angular/core';
import {MovieApiService} from '../movie-api.service';
import {Movies} from '../model/movies';
import {Movie} from '../model/movie';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {AccountService} from '../account.service';
import {FormControl} from '@angular/forms';



@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  private movie: Movie;
  private user: User;
  private isChecked = false;
  ratingCtrl = new FormControl();

  get movieId(): number {
    return this.movieApiService.movie.id;
  }

  constructor(
      private movieApiService: MovieApiService,
      private accountService: AccountService,
      ) { }

  ngOnInit() {
    const selectedMovieId = this.movieId;
    this.movieApiService.getMovieById(selectedMovieId).subscribe(movie => {
      this.movie = movie;
    });
    this.user = this.accountService.loadedUser;
    this.movieApiService.getUserData(this.user);
    // this.movieApiService.getToken();
    this.movieApiService.createUserSession();
  }

  addToWatchedList() {
    const selectedMovie = this.movieId;
    if (!this.isChecked) {
      this.movieApiService.watchedList.push(selectedMovie);
      this.movieApiService.saveToWatchedList(this.user);
    }
  }


  addToWatchlist() {
    const selectedMovie = this.movieId;
    this.movieApiService.watchList.push(selectedMovie);
    this.movieApiService.saveMovieToDb(this.user);
  }

  addRating() {
    const value = this.ratingCtrl.value;
    console.log(value);
  }
}
