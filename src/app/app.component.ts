import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AccountService} from './account.service';

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
      title: 'Watch List',
      url: '/list',
      icon: 'videocam'
    },
    {
      title: 'Search',
      url: '/search',
      icon: 'help'
    },
    {
      title: 'Account',
      url: '/account',
      icon: 'contact'
    }
  ];

  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public accountService: AccountService,
  ) {
    this.accountService.accountLogin();
    this.initializeApp();
  }

  initializeApp() {
    this.accountService.accountLogin();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
