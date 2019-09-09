import { Component, OnInit } from '@angular/core';
import {SelectedMovieService} from '../shared/selected-movie.service';
import * as firebase from 'firebase';
// import {environment} from '../environments/environment'


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  // firebase.initializeApp(environment.firebase);
  // const db = firebase.firestore();

  get title(): string {
    return this.selectedMovie.movie.title;
  }
  get if(): number {
    return this.selectedMovie.movie.id;
  }
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(
      private selectedMovie: SelectedMovieService
  ) {
    for (let i = 1; i < 6; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
