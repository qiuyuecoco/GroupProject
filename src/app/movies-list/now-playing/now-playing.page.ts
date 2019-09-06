import { Component, OnInit } from '@angular/core';
import {Movies} from '../../model/movies';
import {MovieApiService} from '../../movie-api.service';
import {LoadingController, NavController} from '@ionic/angular';
import {Movie} from '../../model/movie';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.page.html',
  styleUrls: ['./now-playing.page.scss'],
})
export class NowPlayingPage implements OnInit {
  private nowPlaying: Movies[];
  constructor(
      private api: MovieApiService,
      private loader: LoadingController,
      private navCtrl: NavController
  ) { }

  async ngOnInit() {
    const loading = await this.loader.create({
      message: 'Getting movies that are now playing...'
    });
    const type = '/now_playing';
    loading.present().then(() => {
      this.api.getMovieTypes(type).subscribe(data => {
        this.nowPlaying = data;
        loading.dismiss();
      });
    });
  }

  movieClicked(movie: Movie) {
    this.api.movie = movie;
    this.navCtrl.navigateForward('movie-details');
  }
}
