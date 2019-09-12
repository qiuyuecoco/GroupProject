import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {Movies} from './model/movies';
import {Movie} from './model/movie';
import {map} from 'rxjs/operators';
import {AccountService} from './account.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  movie: Movie;
  selectedMovie: Movie;
  watchList: number[] = [];
  user: firebase.firestore.CollectionReference;
  userData: number[];
  watchedList: number[] = [];
  watchedData: number[];
  token;

  private movies: Movies[];
  private baseURL = 'https://api.themoviedb.org/3';
  private tokenUrl = 'https://api.themoviedb.org/3/authentication/token/new?api_key=4eb5c031eab630e105a371a7a7c4488e';

  constructor(
      private http: HttpClient,
      private accountService: AccountService,
      ) {
    this.user = this.accountService.dB.collection('ACCOUNTS');
  }
  getToken(): Observable<any> {
    return this.http.get(`${this.baseURL}/authentication/token/new${environment.movieApiKey}`);
  }
  redirectWithToken(token): Observable<any> {
    return this.http.get(`https://www.themoviedb.org/authenticate/
    ${token}?redirect_to=http://localhost:8100/approved`);
  }


  getMovieTypes(type): Observable<any> {
    return this.http.get(`${this.baseURL}/movie${type}?api_key=4eb5c031eab630e105a371a7a7c4488e`);
  }

  dynamicMovieTypes(action, type): Observable<any> {
    const url = `https://api.themoviedb.org/3/${action}/${type}?api_key=4eb5c031eab630e105a371a7a7c4488e`;
    return this.http.get(url).pipe(map(data => data)
    );
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
  saveToWatchedList(user) {
    this.user.doc(user.uid).update({history: this.watchedList})
        .then(_ => console.log('added', this.watchedList))
        .catch(error => console.log('not added', error));
  }
  getUserData(user) {
    console.log(user);
    const docRef = this.user.doc(user.uid);
    console.log(docRef);
    docRef.get().then( doc => {
      if (doc.exists) {
        this.userData = doc.data().watchlist;
        this.watchedData = doc.data().history;
        console.log(this.userData);
        console.log('doc data', doc.data());
      } else {
        console.log('no doc');
      }
        }
    ).catch(error => console.log('nothing', error));
  }
  // getWatchedList(user) {
  //   const docRef = this.user.doc(user.uid);
  //   docRef.get().then( doc => {
  //         if (doc.exists) {
  //           this.userData = doc.data().history;
  //           console.log(this.userData);
  //           console.log('doc data', doc.data());
  //         } else {
  //           console.log('no doc');
  //         }
  //       }
  //   ).catch(error => console.log('nothing', error));
  // }
  getToken() {
    const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=4eb5c031eab630e105a371a7a7c4488e&language=en-US`
    return this.http.get(url).subscribe(data => {
      this.token = data;
      console.log(this.token);
    })
  }
}
