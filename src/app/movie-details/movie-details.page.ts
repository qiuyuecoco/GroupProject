import { Component, OnInit } from '@angular/core';
import {MovieApiService} from '../movie-api.service';
import {Movies} from '../model/movies';
import {Movie} from '../model/movie';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {AccountService} from '../account.service';
import * as firebase from 'firebase';
import {fromDocRef} from "@angular/fire/firestore";

const db = firebase.firestore();
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  private movie: Movie;
  voteCount: number;
  private user: User;
  private isChecked = false;
  private Comments = [];
  document = document;
  get movieId(): number {
    return this.movieApiService.movie.id;
  }

  constructor(
      private movieApiService: MovieApiService,
      private accountService: AccountService,
      ) { }

  ngOnInit() {
    const selectedMovieId = this.movieId;
    this.movieApiService.getMovieById(selectedMovieId).subscribe(movie => {
      this.movie = movie;
      this.voteCount = movie.vote_count;
      console.log(this.movie);
    });
    this.user = this.accountService.loadedUser;
    console.log(this.user);
    this.movieApiService.getUserData(this.user);
  }

  addToWatchedList() {
    const selectedMovie = this.movieId;
    if (!this.isChecked) {
      this.movieApiService.watchedList.push(selectedMovie);
      this.movieApiService.saveToWatchedList(this.user);
    }
  }


  addToWatchlist() {
    const selectedMovie = this.movieId;
    this.movieApiService.watchList.push(selectedMovie);
    this.movieApiService.saveMovieToDb(this.user);
  }

  addRating(movieID) {
    const docRef = db.collection('Movie_Ratings').doc(movieID);
    docRef.get()
        .then(docSnapshot => {
          if (docSnapshot.exists) {
            // do something
          } else {
            console.log('Create Document');
          }
        });
  }

  addComment(movieID, COMMENT) {
    // let Comments: any = [];
    const docRef = db.collection('Movie_user_comments').doc(movieID.toString());
    const userComment = {
      user: this.accountService.loadedUser.displayName,
      comment: COMMENT
    };
    docRef.get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            docRef.onSnapshot((doc) => {
              docRef.update({
                comments: firebase.firestore.FieldValue.arrayUnion(userComment)
              });
            });
          } else {
            docRef.set({comments: [userComment]}); // create the document
          }
        });

    // ref.child('comments').push(userComment);

  }

  addVote() {
    this.voteCount += 1;
  }
}
