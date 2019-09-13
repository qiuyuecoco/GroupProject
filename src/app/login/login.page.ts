import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public accountService: AccountService) { }

  ngOnInit() {
    this.accountService.isLoggedIn();
  }

}
