import { Component, OnInit } from '@angular/core';
import {MovieApiService} from '../../movie-api.service';
import {Movie} from '../../model/movie';
import {AccountService} from '../../account.service';
import {User} from '../../model/user';
import {async} from 'rxjs/internal/scheduler/async';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.page.html',
  styleUrls: ['./watch-list.page.scss'],
})
export class WatchListPage implements OnInit {
  watchList: number[] = [];
  private movie: Movie[] = [];
  private user: User;

  constructor(
      private movieApiService: MovieApiService,
      private accountService: AccountService,
      private loader: LoadingController,
      ) {
    this.watchList = this.movieApiService.userData;
  }

  async ngOnInit() {
    this.user = this.accountService.loadedUser;
    this.movieApiService.getUserData(this.user);
    const loading = await this.loader.create({
      message: 'getting data'
    });
    loading.present().then(() => {
        this.watchList = this.movieApiService.userData;
        console.log(this.watchList);
      // for (let m = 0; m < this.watchList.length; m++) {
      //   this.movieApiService.getMovieById(this.watchList[m]).subscribe(movie => {
      //     this.movie.push(movie);
      //     return this.movie;
      //   })
      // }
        loading.dismiss();
    });

    // for (let m = 0; m < this.watchList.length; m++) {
    //   this.movieApiService.getMovieById(this.watchList[m]).subscribe(movie => {
    //     this.movie.push(movie);
    //     return this.movie;
    //   })
    // }
  }

}
