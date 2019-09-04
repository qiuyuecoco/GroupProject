import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.accountLogin();
  }

}
