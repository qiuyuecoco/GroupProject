import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { FilterMoviesPipe } from './shared/filter-movies.pipe';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [AppComponent, FilterMoviesPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBzxRLUs8ZMvV53CKhfpNHilXii_puTapk',
      authDomain: 'ionic-group-project.firebaseapp.com',
      databaseURL: 'https://ionic-group-project.firebaseio.com',
      projectId: 'ionic-group-project',
      storageBucket: 'ionic-group-project.appspot.com',
      messagingSenderId: '538019533720',
      appId: '1:538019533720:web:fe98a59e19674c74'
    }),
    AngularFirestoreModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
