import { Component, OnInit } from '@angular/core';
import {MovieApiService} from '../movie-api.service';
import {Movies} from '../model/movies';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  private movies: Movies[];
  private popularMovies: Movies[];

  constructor(private movieApiService: MovieApiService) { }

  ngOnInit() {
    this.movieApiService.getPopularMovies().subscribe(data => {
      this.popularMovies = data;
      console.log(data);
    });
  }
}
