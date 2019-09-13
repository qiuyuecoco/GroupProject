import { Component } from '@angular/core';
import {AccountService} from '../account.service';
import {SelectedMovieService} from '../shared/selected-movie.service';
import {LoadingController, NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieApiService} from '../movie-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public allTypes = [
    {typeId: 1, routeUrl: 'upcoming', value: '/upcoming', text: 'Upcoming', icon: 'star'},
    {typeId: 2, routeUrl: 'movies-list', value: '/top_rated', text: 'Top Rated', icon: 'trophy'},
    {typeId: 3, routeUrl: 'popular', value: '/popular', text: 'Popular', icon: 'analytics'},
    {typeId: 4, routeUrl: 'now-playing', value: '/now_playing', text: 'Now Playing', icon: 'film'},
    {typeId: 5, routeUrl: 'latest', value: '/latest', text: 'Latest', icon: 'list'},
  ];

  get movieId(): string {
    return this.route.snapshot.paramMap.get('id');
  }

  constructor(
      public accountService: AccountService,
      private selectedMovie: SelectedMovieService,
      private navCtrl: NavController,
      private route: ActivatedRoute,
      private types: MovieApiService,
      private loader: LoadingController,
      private router: Router
  ) {
    // console.log('** NAV PARAMS:', this.movieId);
  }
  async categoryTapped(categoryType) {
    const loading = await this.loader.create({message: 'Loading category list...'});
    loading.present().then(() => {
      this.types.getMovieTypes(categoryType.value).subscribe(() => {
        this.router.navigate([`${categoryType.routeUrl}`, {categoryType: categoryType.value}]);
        this.loader.dismiss();
      });
    });
  }
}

