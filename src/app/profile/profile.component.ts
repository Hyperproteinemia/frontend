import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AccountService} from '../services/account.service';
import {UserService} from '../services/user.service';
import {User} from '../entities/user';
import {ActivatedRoute, Router} from '@angular/router';
import {Contact} from '../entities/contact';
import { MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  user: User;
  username: string;
  myName: string;
  areContactsPrivate: boolean;
  avatar: any;
  opened: boolean = false;
  requestMessage: string;
  requestExists: boolean = false;

  constructor(private userService: UserService,
    private route: ActivatedRoute, private authService: AccountService,
    private router: Router, private requestService: RequestService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params.username;
      this.userService.getUserById(params.username).subscribe(success => {
        this.user = success;
        this.areContactsPrivate = this.user.privateContacts;
      },
        error => { this.user = undefined});
    });
    if (this.authService.user != undefined)
      this.myName = this.authService.user.username;

    this.userService.getContacts(this.username).subscribe(data => {
      this.user.contacts = data;
    });
    this.requestService.loadOutgoingRequests().subscribe(requests => {
      requests.forEach(req => {
        if (req.to == this.username)
          this.requestExists = true;
      });
    });
    if (this.username === this.myName)
      this.requestExists = true;
  }

  openEditor() {
    this.router.navigateByUrl('/mutable-profile/' + this.username);
  }

  sendRequest() {
      this.requestService.sendRequest(this.username, this.requestMessage).subscribe(response => {
        this.opened = false;
      });
  }

}
