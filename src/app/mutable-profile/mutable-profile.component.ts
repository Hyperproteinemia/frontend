import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { User } from '../entities/user';
import { Contact, ContactType } from '../entities/contact';
import { UserContactsService } from '../services/user-contacts.service';

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
  areContactsPrivate: boolean;
  avatar: any;

  constructor(private userService: UserService,
    private route: ActivatedRoute, private authService: AccountService,
    private router: Router, private userContactService: UserContactsService) { }

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
      console.log(data);
      this.telegramNumber = this.userContactService.getContact(ContactType.TELEGRAM, data);
      this.whatsAppNumber = this.userContactService.getContact(ContactType.WHATSAPP, data);
      this.mobilePhone = this.userContactService.getContact(ContactType.MOBILE, data);
      this.instagramName = this.userContactService.getContact(ContactType.INSTAGRAM, data);
    });
    
  }

  saveContacts() {
    if (this.telegramNumber != '')
    this.userContactService.setTelegram(this.user, this.telegramNumber);
    if (this.whatsAppNumber != '')
    this.userContactService.setWhatsApp(this.user, this.whatsAppNumber);
    if (this.mobilePhone != '')
      this.userContactService.setPhoneNumber(this.user, this.mobilePhone);
    if (this.instagramName != '')
      this.userContactService.setInstagram(this.user, this.instagramName);
  }

  saveBio() {
    console.log(this.user);
    this.saveContacts();
    this.userService.updateBio(this.user).subscribe(res => {
      this.userService.updateContacts(this.user.contacts).subscribe(res => {
        this.router.navigateByUrl('/profile/'+this.username);
      });
    });
    
    
  }

}
