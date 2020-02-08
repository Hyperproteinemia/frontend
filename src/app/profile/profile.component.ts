import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { UserService } from '../services/user.service';
import { User } from '../entities/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  user: User;
  username: string;

  constructor(private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params.username;
      this.userService.getUserById(params.username).subscribe(success => {
        this.user = success;
      },
        error => { this.user = undefined});
    });
  }

}
