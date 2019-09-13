import { Component, OnInit } from '@angular/core';
import {Movies} from '../../model/movies';
import {MovieApiService} from '../../movie-api.service';
import {LoadingController, NavController} from '@ionic/angular';
import {Movie} from '../../model/movie';
import {User} from '../../model/user';
import {AccountService} from '../../account.service';

@Component({
  selector: 'app-watched-list',
  templateUrl: './watched-list.page.html',
  styleUrls: ['./watched-list.page.scss'],
})
export class WatchedListPage implements OnInit {
  watched: number[] = [];
  private movie: Movie [] = [];
  private user: User;

  constructor(
      private api: MovieApiService,
      private loader: LoadingController,
      private navCtrl: NavController,
      private accountService: AccountService
  ) {
  }

  async ngOnInit() {
    this.user = this.accountService.loadedUser;
    this.api.getUserData(this.user);
    const loading = await this.loader.create({
      message: 'Already seen movies...'
    });
    // const selectedMovieId = this.watched;
    loading.present().then(() => {
      this.watched = this.api.watchedList;
      console.log(this.watched);
      for (let i = 0; i < this.watched.length; i++) {
        this.api.getMovieById(this.watched[i]).subscribe(data => {
          this.movie.push(data);
          return this.movie;
          // console.log('Movie data: ', this.movie);
        });
      }
      loading.dismiss();
    });
  }

  movieClicked(movie: Movie) {
    this.api.movie = movie;
    this.navCtrl.navigateForward('movie-details');
  }
}
