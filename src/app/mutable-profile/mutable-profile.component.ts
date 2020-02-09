import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { User } from '../entities/user';
import { Contact } from '../entities/contact';

@Component({
  selector: 'app-mutable-profile',
  templateUrl: './mutable-profile.component.html',
  styleUrls: ['./mutable-profile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MutableProfileComponent implements OnInit {

  instagramName: string;
  telegramNumber: string;
  whatsAppNumber: string;
  mobilePhone: string;
  public user: User;
  username: string;
  myName: string;
  contacts: Contact[];
  areContactsPrivate: boolean;
  avatar: any;

  constructor(private userService: UserService,
    private route: ActivatedRoute, private authService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
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
      this.contacts = data;
    });
    
  }

  saveContacts() {
    if (this.telegramNumber != this.user.getTelegram())
      this.user.setTelegram(this.telegramNumber);
    if (this.whatsAppNumber != this.user.getWhatsApp())
      this.user.setTelegram(this.telegramNumber);
    if (this.mobilePhone != this.user.getMobileNumber())
      this.user.setTelegram(this.telegramNumber);
    if (this.instagramName != this.user.getInstagram())
      this.user.setTelegram(this.telegramNumber);
    this.contacts = this.user.contacts;
  }

  saveBio() {
    console.log(this.user);
    this.saveContacts();
    this.userService.updateBio(this.user).subscribe(res => {
      this.router.navigateByUrl('/profile/'+this.username);
    });
    this.userService.updateContacts(this.user.contacts);
    
  }

}
