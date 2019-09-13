import { Component, OnInit } from '@angular/core';
import {LoadingController, NavController} from '@ionic/angular';
import {Movies} from '../model/movies';
import {MovieApiService} from '../movie-api.service';
import {Movie} from '../model/movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.page.html',
  styleUrls: ['./movies-list.page.scss'],
})
export class MoviesListPage implements OnInit {

  public movies: Movies[];

  constructor(
      public movieApiService: MovieApiService,
      public loader: LoadingController,
      public navCtrl: NavController,
  ) { }

  async ngOnInit() {
    const loading = await this.loader.create({
      message: 'top rated...'
    });
    const type = 'top_rated';
    const action = 'movie';
    loading.present().then(() => {
      this.movieApiService.dynamicMovieTypes(action, type).subscribe(data => {
        this.movies = data;
        console.log(data, this.movies);
        loading.dismiss();
      });
    });
  }

  movieClicked(movie: Movie) {
    this.movieApiService.movie = movie;
    this.navCtrl.navigateForward('movie-details');
  }
}
