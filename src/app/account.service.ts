import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';


firebase.initializeApp(environment.firebase);
const db = firebase.firestore();
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  provider = new firebase.auth.GoogleAuthProvider();
  loadedUser: any;
  dB = db;
  constructor(private router: Router) { }
  login() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        // RE-ROUTE TO HOME
        this.router.navigate(['/home']);
      } else {
        firebase.auth().signInWithPopup(this.provider).then(r => {
          firebase.auth().getRedirectResult().then((result) => {
            // The signed-in user info.
            this.createUserDocument();
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
      }
    });

  }
  isLoggedIn() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(user);
        // RE-ROUTE TO HOME
        // document.location.href = '/home';
        this.loadedUser = user;
        this.router.navigate(['/home']);
      } else {
        console.log('not logged in.');
      }
    });
  }
  createUserDocument() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.loadedUser = user;
        const docRef = db.collection('ACCOUNTS').doc(user.uid);
        docRef.get().then((docSnapshot) => {
          if (docSnapshot.exists) {
            docRef.onSnapshot((doc) => {
            });
          } else {
            db.collection('ACCOUNTS').doc(user.uid).set({
              watchlist: [],
              history: [],
              email: user.email,
              name: user.displayName
            }).then(() => {
              console.log(`Document Successfully Written.`);
            }).catch((error) => {
              console.log(`Error Writing Document: ${error}`);
            });
          }
        });
      } else {
        console.log('not logged in.');
      }
    });
  }
  accountLogin() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loadedUser = user;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
  logOut() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log(error);
    });
  }
}
