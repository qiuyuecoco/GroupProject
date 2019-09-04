import { Component, OnInit } from '@angular/core';
import {MovieApiService} from '../movie-api.service';
import {Movie} from '../model/movie';
import {Movies} from '../model/movies';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  private movies: Movies[];

  constructor(private movieApiService: MovieApiService) { }

  ngOnInit() {
    this.movieApiService.getMovieData().subscribe(data => {
      console.log(data);
      this.movies = data;
    }
    );
  }

}
