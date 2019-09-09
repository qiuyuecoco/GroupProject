import { Component, OnInit } from '@angular/core';
import {MovieApiService} from '../../movie-api.service';
import {LoadingController, NavController} from '@ionic/angular';
import {Movie} from '../../model/movie';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.page.html',
  styleUrls: ['./latest.page.scss'],
})
// TODO: DO NOT IMPLEMENT; inappropriate for class/work
export class LatestPage implements OnInit {
  private latestType: Movie[];

  constructor(
      private api: MovieApiService,
      private loader: LoadingController,
      private navCtrl: NavController
  ) { }

  ngOnInit() {
    const type = '/latest';
    this.api.getMovieTypes(type).subscribe(data => {
        this.latestType = data;
    });
  }
  movieClicked(movie: Movie) {
    this.api.movie = movie;
    this.navCtrl.navigateForward('movie-details');
  }
}
