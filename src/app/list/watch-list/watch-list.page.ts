import { Component, OnInit } from '@angular/core';
import {MovieApiService} from '../../movie-api.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.page.html',
  styleUrls: ['./watch-list.page.scss'],
})
export class WatchListPage implements OnInit {
  private watchList: number[] = [];

  constructor(private movieApiService: MovieApiService) { }

  ngOnInit() {
    this.watchList = this.movieApiService.watchList;
  }

}
