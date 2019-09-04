// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  popularMovieUrl: 'https://api.themoviedb.org/3/movie/popular?api_key=4eb5c031eab630e105a371a7a7c4488e',
  firebase: {
    apiKey: 'AIzaSyBzxRLUs8ZMvV53CKhfpNHilXii_puTapk',
    authDomain: 'ionic-group-project.firebaseapp.com',
    databaseURL: 'https://ionic-group-project.firebaseio.com',
    projectId: 'ionic-group-project',
    storageBucket: 'ionic-group-project.appspot.com',
    messagingSenderId: '538019533720',
    appId: '1:538019533720:web:fe98a59e19674c74'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
