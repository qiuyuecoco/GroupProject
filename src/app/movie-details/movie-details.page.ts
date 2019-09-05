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

  get movieId(): number {
    return this.movieApiService.movie.id;
  }

  constructor(private movieApiService: MovieApiService) { }

  ngOnInit() {
    const selectedMovieId = this.movieId;
    this.movieApiService.getMovieById(selectedMovieId).subscribe(movie => {
      this.movie = movie;
      console.log(this.movie);
    });
  }

  segmentChanged(event: any) {
    console.log('Segment changed', event);
  }
}
