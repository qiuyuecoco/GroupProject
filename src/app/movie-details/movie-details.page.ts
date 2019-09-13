import { Component, OnInit } from '@angular/core';
import {MovieApiService} from '../movie-api.service';
import {Movies} from '../model/movies';
import {Movie} from '../model/movie';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {AccountService} from '../account.service';
import * as firebase from 'firebase';
import {fromDocRef} from '@angular/fire/firestore';
import {FormControl} from '@angular/forms';
import {ToastController} from '@ionic/angular';


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
  ratingCtrl = new FormControl();

  get movieId(): number {
    return this.movieApiService.movie.id;
  }

  constructor(
      private movieApiService: MovieApiService,
      private accountService: AccountService,
      private toastContoller: ToastController,
      ) { }

  ngOnInit() {
    const selectedMovieId = this.movieId;
    this.movieApiService.getMovieById(selectedMovieId).subscribe(movie => {
      this.movie = movie;
    });
    this.user = this.accountService.loadedUser;
    this.movieApiService.getUserData(this.user);
    // this.movieApiService.getToken();
    this.movieApiService.createUserSession();
  }

  addToWatchedList() {
    const selectedMovie = this.movieId;
    const watchedList = this.movieApiService.watchedList;
    let exists = false;
    for (let m = 0; m < watchedList.length; m++) {
      if (selectedMovie === watchedList[m]) {
        console.log('already added' + watchedList[m]);
        this.presentMovieExistsToast();
        exists = true;
      }
    }
    if (exists === false) {
      if (!this.isChecked) {
        this.movieApiService.watchedList.push(selectedMovie);
        this.movieApiService.saveToWatchedList(this.user);
        this.presentWatchedListToast();
      }
    }
  }


  addToWatchlist() {
    const selectedMovie = this.movieId;
    const watchList = this.movieApiService.watchList;
    let exists = false;
    for (let m = 0; m < watchList.length; m++) {
      if (selectedMovie === watchList[m]) {
        console.log('already added' + watchList[m]);
        this.presentMovieExistsToast();
        exists = true;
      }
    }
    if (exists === false) {
      this.movieApiService.watchList.push(selectedMovie);
      this.movieApiService.saveMovieToDb(this.user);
      this.presentWatchListToast();
    }
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
              this.presentCommentToast();
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
  authToken() {
    this.movieApiService.redirectWithToken().subscribe(data => {
      console.log(data);
    });
  }
  attachGuestSessionId() {
    const rateValue = this.ratingCtrl.value;
    const movieId = this.movieId;
    this.movieApiService.rateMovieWithSessionAndId(movieId, rateValue);
    this.presentVotedToast();
    console.log(movieId);
  }
  async presentWatchListToast() {
    const toast = await this.toastContoller.create({
      message: 'Added to Watch List',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
  async presentWatchedListToast() {
    const toast = await this.toastContoller.create({
      message: 'Added to Seen It List',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
  async presentVotedToast() {
    const toast = await this.toastContoller.create({
      message: 'Thanks for Voting!',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
  async presentCommentToast() {
    const toast = await this.toastContoller.create({
      message: 'Comment Added',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
  async presentMovieExistsToast() {
    const toast = await this.toastContoller.create({
      message: 'Movie Already Added',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
}
