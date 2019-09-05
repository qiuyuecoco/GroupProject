import { Component, OnInit } from '@angular/core';
import {LoadingController, NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {Movies} from '../model/movies';
import {MovieApiService} from '../movie-api.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.page.html',
  styleUrls: ['./movies-list.page.scss'],
})
export class MoviesListPage implements OnInit {

  private movies: Movies[];
  constructor(
      private movieApiService: MovieApiService,
      private loader: LoadingController,
  ) { }

  async ngOnInit() {
    const loading = await this.loader.create({
      message: 'Getting movies...'
    });
    const type = 'top_rated';
    const action = 'movie';
// const language = '&language=en-US';
    loading.present().then(() => {
      // const selectedMovieId = this.route.snapshot.paramMap.get('id');
      this.movieApiService.dynamicMovieTypes(action, type).subscribe(data => {
        this.movies = data;
        console.log(data, this.movies);
        loading.dismiss();
      });
    });
  }
}
