import { Injectable } from '@angular/core';
import {Movie} from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class SelectedMovieService {
  movie: Movie;
  constructor() { }
}
