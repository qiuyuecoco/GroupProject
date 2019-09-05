import { Component } from '@angular/core';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public accountService: AccountService) { }

}
