import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {Movies} from './model/movies';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  constructor(private http: HttpClient) { }

  getMovieData(): Observable<Movies[]> {
    return this.http.get<Movies[]>(environment.movieDataUrl);
  }
}
