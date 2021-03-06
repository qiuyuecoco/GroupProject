import { Component, OnInit } from '@angular/core';
import {MovieApiService} from '../../movie-api.service';
import {LoadingController, NavController} from '@ionic/angular';
import {Movie} from '../../model/movie';
import {Movies} from '../../model/movies';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.page.html',
  styleUrls: ['./latest.page.scss'],
})
export class LatestPage implements OnInit {
  public latestType: Movie;

  constructor(
      private api: MovieApiService,
      private loader: LoadingController,
      private navCtrl: NavController
  ) { }

  async ngOnInit() {
    const loading = await this.loader.create({
      message: 'latest...'
    });
    const type = '/latest';
    loading.present().then(() => {
      this.api.getMovieTypes(type).subscribe(data => {
        this.latestType = data;
        loading.dismiss();
      });
    });
  }
  // ngOnInit() {
  //   const type = '/latest';
  //   this.api.getMovieTypes(type).subscribe(data => {
  //       this.latestType = data;
  //   });
  // }
  movieClicked(movie: Movie) {
    this.api.movie = movie;
    this.navCtrl.navigateForward('movie-details');
  }
}
