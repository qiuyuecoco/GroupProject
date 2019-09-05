import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {Movies} from './model/movies';
import {Movie} from './model/movie';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  movie: Movie;
  selectedMovie: Movie;

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<Movies[]> {
    return this.http.get<Movies[]>(environment.popularMovieUrl);
  }
  getTopRatedMovies(): Observable<Movies[]> {
    return this.http.get<Movies[]>(environment.movieDataTopRated);
  }
  getMovieById(movieId): Observable<Movie> {
    return this.http.get<Movie>(`${environment.movieBaseUrl}${movieId}${environment.movieApiKey}`).pipe(map(movie => {
      this.selectedMovie = movie;
      return this.selectedMovie;
    }));
  }

}
