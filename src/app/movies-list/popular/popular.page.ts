import { Component, OnInit } from '@angular/core';
import {Movies} from '../../model/movies';
import {MovieApiService} from '../../movie-api.service';
import {Movie} from '../../model/movie';
import {LoadingController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.page.html',
  styleUrls: ['./popular.page.scss'],
})
export class PopularPage implements OnInit {
  public popularMovies: Movie;

  constructor(
      private movieApiService: MovieApiService,
      private navCtrl: NavController,
      private loader: LoadingController
  ) { }

  async ngOnInit() {
    const loading = await this.loader.create({
      message: 'popular...'
    });
    const type = '/popular';
    loading.present().then(() => {
      this.movieApiService.getMovieTypes(type).subscribe(data => {
        this.popularMovies = data;
        loading.dismiss();
      });
    });
  }

  movieClicked(movie: Movie) {
    this.movieApiService.movie = movie;
    this.navCtrl.navigateForward('movie-details');
  }

}
