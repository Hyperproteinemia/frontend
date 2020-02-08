import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AccountService } from '../services/account.service';
import { UserService } from '../services/user.service';
import { User } from '../entities/user';
import { ActivatedRoute } from '@angular/router';
import { Contact, ContactType } from '../entities/contact';

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

  instagramName: string;
  telegramNumber: string;
  whatsAppNumber: string;
  mobilePhone: string;
  

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
    document.getElementById("country-input").classList.remove('invisible');
    document.getElementById("city-input").classList.remove('invisible');
    document.getElementById("country-output").classList.add('invisible');
    document.getElementById("city-output").classList.add('invisible');
    document.getElementById("contacts-input").classList.remove('invisible');
  }

  saveBio() {
    if (this.user.contacts == undefined)
      this.user.contacts = [];
    if (this.instagramName != undefined)
      this.user.contacts.push({type: ContactType.INSTAGRAM, value: this.instagramName});
      if (this.instagramName != undefined)
      this.user.contacts.push({type: ContactType.MOBILE, value: this.mobilePhone});
      if (this.instagramName != undefined)
      this.user.contacts.push({type: ContactType.TELEGRAM, value: this.telegramNumber});
      if (this.instagramName != undefined)
      this.user.contacts.push({type: ContactType.WHATSAPP, value: this.whatsAppNumber});
    this.userService.updateBio(this.user).subscribe(success => {
      this.contacts = this.user.contacts;
      document.getElementById("bio-mutable").classList.add('invisible');
      document.getElementById("bio-immutable").classList.remove('invisible');
      document.getElementById("country-input").classList.add('invisible');
      document.getElementById("city-input").classList.add('invisible');
      document.getElementById("country-output").classList.remove('invisible');
      document.getElementById("city-output").classList.remove('invisible');
      document.getElementById("contacts-input").classList.add('invisible');
    });
  }

}
