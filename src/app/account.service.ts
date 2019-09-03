import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

firebase.initializeApp(  {
  apiKey: 'AIzaSyBzxRLUs8ZMvV53CKhfpNHilXii_puTapk',
  authDomain: 'ionic-group-project.firebaseapp.com',
  databaseURL: 'https://ionic-group-project.firebaseio.com',
  projectId: 'ionic-group-project',
  storageBucket: 'ionic-group-project.appspot.com',
  messagingSenderId: '538019533720',
  appId: '1:538019533720:web:fe98a59e19674c74'
});

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  provider = new firebase.auth.GoogleAuthProvider();
  constructor() { }
  login() {
    firebase.auth().signInWithPopup(this.provider).then(r => {
      firebase.auth().getRedirectResult().then((result) => {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // @ts-ignore
          const token = result.credential.accessToken;
          console.log(token);
          // ...
        }
        // The signed-in user info.
        const user = result.user;
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
    });
    this.isLoggedIn();
  }
  isLoggedIn() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        document.location.href = '/home';
      } else {
      }
    });
  }
}
