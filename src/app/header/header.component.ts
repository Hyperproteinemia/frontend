import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  logout() {
    this.auth.logout();
  }

  constructor(public auth: AccountService) { }

  ngOnInit() {
  }

}
