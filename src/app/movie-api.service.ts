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
  userSession;


  private movies: Movies[];
  private baseURL = 'https://api.themoviedb.org/3';
  private tokenUrl = 'https://api.themoviedb.org/3/authentication/token/new?api_key=4eb5c031eab630e105a371a7a7c4488e';

  constructor(
      private http: HttpClient,
      private accountService: AccountService,
      ) {
    this.user = this.accountService.dB.collection('ACCOUNTS');
  }
  searchMovie(query): Observable<any> {
    return this.http.get(`${this.baseURL}/search/movie${environment.movieApiKey}&language=en-US&query=${query}&include_adult=false`);
  }

  getMovieTypes(type): Observable<any> {
    return this.http.get(`${this.baseURL}/movie${type}${environment.movieApiKey}`);
  }

  dynamicMovieTypes(action, type): Observable<any> {
    const url = `https://api.themoviedb.org/3/${action}/${type}${environment.movieApiKey}`;
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
    // console.log(user);
    const docRef = this.user.doc(user.uid);
    // console.log(docRef);
    docRef.get().then( doc => {
      if (doc.exists) {
        this.userData = doc.data().watchlist;
        this.watchedData = doc.data().history;
        // console.log(this.userData);
        // console.log('doc data', doc.data());
      } else {
        console.log('no doc');
      }
        }
    ).catch(error => console.log('nothing', error));
  }
  getToken() {
    const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=4eb5c031eab630e105a371a7a7c4488e&language=en-US`;
    return this.http.get(url).subscribe(data => {
      this.token = data;
      console.log(this.token.request_token);
    });
  }
  redirectWithToken(): Observable<any> {
    // return this.http.get(`https://www.themoviedb.org/authenticate/${this.token.request_token}?redirect_to=http://localhost:8100/`);
    return this.http.get(`https://www.themoviedb.org/authenticate/${this.token.request_token}`);
  }
  createUserSession() {
    const url = 'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=4eb5c031eab630e105a371a7a7c4488e';
    return this.http.get(url).subscribe(data => {
      this.userSession = data;
      console.log('guest session: ', this.userSession);
    });
  }
  rateMovieWithSessionAndId(movieId, rateValue) {
    // const rateValue = this.ratingCtrl.value;
    const url = `${this.baseURL}/movie/${movieId}/rating${environment.movieApiKey}&guest_session_id=${this.userSession.guest_session_id}`;
    return this.http.post(url, {value: rateValue}).subscribe(data => {

      // this.sessionId = data;
      console.log('session & id: ', this.userSession);
    });
  }

}
