import { Component, OnInit } from '@angular/core';
import {MovieApiService} from '../movie-api.service';
import {Movies} from '../model/movies';
import {Movie} from '../model/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  private movie: Movie;
  voteCount: number;

  get movieId(): number {
    return this.movieApiService.movie.id;
  }

  constructor(private movieApiService: MovieApiService) { }

  ngOnInit() {
    const selectedMovieId = this.movieId;
    this.movieApiService.getMovieById(selectedMovieId).subscribe(movie => {
      this.movie = movie;
      this.voteCount = movie.vote_count;
      console.log(this.movie);
    });
  }
  addToWatchedList() {
    const selectedMovie = this.movieId;
    this.movieApiService.watchedList.push(selectedMovie);
    console.log(this.movieApiService.watchedList);  }

  addToWatchlist() {
    const selectedMovie = this.movieId;
    this.movieApiService.watchList.push(selectedMovie);
    console.log(this.movieApiService.watchList);
  }

  addVote() {
    this.voteCount += 1;
  }
}
