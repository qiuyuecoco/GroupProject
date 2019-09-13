import { Component, OnInit } from '@angular/core';
import {MovieApiService} from '../../movie-api.service';
import {LoadingController, NavController} from '@ionic/angular';
import {Movie} from '../../model/movie';
import {Movies} from '../../model/movies';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
})
export class UpcomingPage implements OnInit {
  public upcoming: Movie;
  constructor(
      private api: MovieApiService,
      private loader: LoadingController,
      private navCtrl: NavController
  ) { }

  async ngOnInit() {
    const loading = await this.loader.create({
      message: 'upcoming movies...'
    });
    const type = '/upcoming';
    loading.present().then(() => {
      this.api.getMovieTypes(type).subscribe(data => {
        this.upcoming = data;
        loading.dismiss();
      });
    });
  }

  movieClicked(movie: Movie) {
    this.api.movie = movie;
    this.navCtrl.navigateForward('movie-details');
  }

}
