import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'movies-list', loadChildren: './movies-list/movies-list.module#MoviesListPageModule' },
  { path: 'movie-details', loadChildren: './movie-details/movie-details.module#MovieDetailsPageModule'},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'popular', loadChildren: './movies-list/popular/popular.module#PopularPageModule' },
  { path: 'upcoming', loadChildren: './movies-list/upcoming/upcoming.module#UpcomingPageModule' },
  { path: 'now-playing', loadChildren: './movies-list/now-playing/now-playing.module#NowPlayingPageModule' },
  { path: 'latest', loadChildren: './movies-list/latest/latest.module#LatestPageModule' },
  { path: 'top-rated', loadChildren: './movies-list/top-rated/top-rated.module#TopRatedPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
