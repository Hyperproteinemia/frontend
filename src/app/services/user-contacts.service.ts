import { Injectable } from '@angular/core';
import { User } from '../entities/user';
import { ContactType, Contact } from '../entities/contact';

@Injectable({
  providedIn: 'root'
})
export class UserContactsService {

  constructor() { }

  public contains(user: User, type: ContactType) : boolean {
    user.contacts.forEach(user => {
      if (user.type == type)
        return true;
    });
    return false;
  }

  public getTelegram(user: User): string {
    user.contacts.forEach(contact => {
        if (contact.type == ContactType.TELEGRAM)
            return contact.value;
    });
    return '';
}

public getWhatsApp(user: User): string {
  user.contacts.forEach(contact => {
        if (contact.type == ContactType.WHATSAPP)
            return contact.value;
    });
    return '';
}

public getMobileNumber(user: User) : string {
  user.contacts.forEach(contact => {
        if (contact.type == ContactType.MOBILE)
            return contact.value;
    });
    return '';
}

public getInstagram(user: User): string {
  user.contacts.forEach(contact => {
        if (contact.type == ContactType.INSTAGRAM)
            return contact.value;
    });
    return '';
}

public setTelegram(user: User, number: string) {
  if (this.contains(user, ContactType.TELEGRAM)) {
  user.contacts.forEach(contact => {
        if (contact.type == ContactType.TELEGRAM) {
            contact.value = number;
            return;
        }
    });
  } else {
    user.contacts.push({type: ContactType.TELEGRAM, value: number});
  }
}

public setWhatsApp(user: User, number: string) {
  if (this.contains(user, ContactType.WHATSAPP)) {
  user.contacts.forEach(contact => {
        if (contact.type == ContactType.WHATSAPP) {
            contact.value = number;
            return;
        }
    });
  } else {
    user.contacts.push({type: ContactType.WHATSAPP, value: number});
  }
}

public setPhoneNumber(user: User, number: string) {
  if (this.contains(user, ContactType.MOBILE)) {
  user.contacts.forEach(contact => {
        if (contact.type == ContactType.MOBILE) {
            contact.value = number;
            return;
        }
    });
  } else {
    user.contacts.push({type: ContactType.MOBILE, value: number});
  }
}

public setInstagram(user: User, number: string) {
  if (this.contains(user, ContactType.INSTAGRAM)) {
  user.contacts.forEach(contact => {
        if (contact.type == ContactType.INSTAGRAM) {
            contact.value = number;
            return;
        }
    });
  } else {
    user.contacts.push({type: ContactType.INSTAGRAM, value: number});
  }
}

}
