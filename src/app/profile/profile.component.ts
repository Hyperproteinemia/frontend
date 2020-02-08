import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AccountService } from '../services/account.service';
import { UserService } from '../services/user.service';
import { User } from '../entities/user';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../entities/contact';

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
  contacts: Contact[];
  areContactsPrivate: boolean;

  constructor(private userService: UserService,
    private route: ActivatedRoute, private authService: AccountService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params.username;
      this.userService.getUserById(params.username).subscribe(success => {
        this.user = success;
      },
        error => { this.user = undefined});
    });
    if (this.authService.user != undefined)
      this.myName = this.authService.user.username;

    this.userService.getContacts(this.username).subscribe(data => {
      this.contacts = data;
      this.areContactsPrivate = false;
    }, error => {
      this.areContactsPrivate = true;
    });
  }

  openEditor() {
    document.getElementById("bio-mutable").classList.remove('invisible');
    document.getElementById("bio-immutable").classList.add('invisible');
  }

  saveBio() {
    this.userService.updateBio(this.user).subscribe(success => {
      document.getElementById("bio-mutable").classList.add('invisible');
      document.getElementById("bio-immutable").classList.remove('invisible');
    });
  }

}
