import { Component, OnInit } from '@angular/core';
import {MovieApiService} from '../movie-api.service';
import {Movies} from '../model/movies';
import {Movie} from '../model/movie';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {AccountService} from '../account.service';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  private movie: Movie;
  voteCount: number;
  private user: User;
  private isChecked = false;

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
      this.voteCount = movie.vote_count;
      console.log(this.movie);
    });
    this.user = this.accountService.loadedUser;
    console.log(this.user);
    this.movieApiService.getUserData(this.user);
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

  addVote() {
    this.voteCount += 1;
  }
}
