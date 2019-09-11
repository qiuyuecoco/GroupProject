import { Component, OnInit } from '@angular/core';
import {Movies} from '../../model/movies';
import {MovieApiService} from '../../movie-api.service';
import {LoadingController, NavController} from '@ionic/angular';
import {Movie} from '../../model/movie';

@Component({
  selector: 'app-watched-list',
  templateUrl: './watched-list.page.html',
  styleUrls: ['./watched-list.page.scss'],
})
export class WatchedListPage implements OnInit {

  private watched: number[] = [474350, 920];
  private watchMovie: Movie;

  // get movieById(): number {
  //   return this.api.movie.id;
  // }
  constructor(
      private api: MovieApiService,
      private loader: LoadingController,
      private navCtrl: NavController
  ) { }

  async ngOnInit() {
    const loading = await this.loader.create({
      message: 'Already seen movies...'
    });
    // for (i = 0; i < this.watched.length; i++) {
    const selectedMovieId = this.watched;
    loading.present().then(() => {
      this.api.getMovieById(selectedMovieId).subscribe(data => {
        this.watchMovie = data;
        console.log('Movie data: ', data);
        loading.dismiss();
      });
    });
    // }
  }

  movieClicked(movie: Movie) {
    this.api.movie = movie;
    this.navCtrl.navigateForward('movie-details');
  }
}
