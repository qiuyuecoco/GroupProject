import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Top Rated',
      url: '/movies-list',
      icon: 'star'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
      {
          title: 'Account',
          url: '/account',
          icon: 'contact'
      },
      {
      title: 'Login',
      url: '/login',
      icon: 'list'
    },
    {
      title: 'Popular',
      url: '/movie-details',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
