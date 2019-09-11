import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {Movies} from './model/movies';
import {Movie} from './model/movie';
import {map} from 'rxjs/operators';
import {AccountService} from './account.service';
import * as firebase from 'firebase';
import {User} from './model/user';
import {AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AngularFireObject} from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  movie: Movie;
  selectedMovie: Movie;
  watchList: number[] = [];
  user: firebase.firestore.CollectionReference;
  userData: number[];

  private movies: Movies[];
  private baseURL = 'https://api.themoviedb.org/3';

  constructor(
      private http: HttpClient,
      private accountService: AccountService,
      ) {
    this.user = this.accountService.dB.collection('ACCOUNTS');
  }

  getMovieTypes(type): Observable<any> {
    return this.http.get(`${this.baseURL}/movie${type}?api_key=4eb5c031eab630e105a371a7a7c4488e`);
  }

  dynamicMovieTypes(action, type): Observable<any> {
    const url = `https://api.themoviedb.org/3/${action}/${type}?api_key=4eb5c031eab630e105a371a7a7c4488e`;
    return this.http.get(url).pipe(map(data => data)
    );
  }
  dynamicMovieSearch(type, query, language): Observable<any> {
    // tslint:disable-next-line:max-line-length
    const url = `https://api.themoviedb.org/3/search/${type}?api_key=4eb5c031eab630e105a371a7a7c4488e${query}${language}&page=1&include_adult=false&`;
    return this.http.get(url).pipe(map(data => data));

  }

  getPopularMovies(): Observable<Movies[]> {
    return this.http.get<Movies[]>(environment.popularMovieUrl);
  }
  getTopRatedMovies(): Observable<Movies[]> {
    return this.http.get<Movies[]>(environment.movieDataTopRated);
  }
  getMovieById(movieId): Observable<Movie> {
    return this.http.get<Movie>(`${environment.movieBaseUrl}${movieId}${environment.movieApiKey}`)
        .pipe(map(movie => {
      this.selectedMovie = movie;
      return this.selectedMovie;
    }));
  }
  saveMovieToDb(user) {
    this.user.doc(user.uid).update({watchlist: this.watchList})
        .then(_ => console.log('added', this.watchList))
        .catch(error => console.log('not added', error));
  }
  getUserData(user) {
    console.log(user);
    let docRef = this.user.doc(user.uid);
    console.log(docRef);
    docRef.get().then( doc => {
      if (doc.exists) {
        this.userData = doc.data().watchlist;
        console.log(this.userData);
        console.log("doc data", doc.data());
      } else {
        console.log('no doc');
      }
        }
    ).catch(error => console.log('nothing', error))
    // return this.user.doc(user.uid)
  }
}
