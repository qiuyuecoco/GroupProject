import { Component, OnInit } from '@angular/core';
import {Movies} from '../../model/movies';
import {MovieApiService} from '../../movie-api.service';
import {Movie} from '../../model/movie';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.page.html',
  styleUrls: ['./popular.page.scss'],
})
export class PopularPage implements OnInit {
  private popularMovies: Movies[];

  constructor(
      private movieApiService: MovieApiService,
      private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.movieApiService.getPopularMovies().subscribe(data => {
      this.popularMovies = data;
      console.log(data);
    });
  }

  movieClicked(movie: Movie) {
    this.movieApiService.movie = movie;
    this.navCtrl.navigateForward('movie-details');
  }

}
