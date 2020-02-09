import { Contact, ContactType } from './contact';

export class User {
    username: string;
    email: string;
    bio: string;
    privateContacts: boolean;
    contacts: Contact[];
    city: string;
    country: string;
    name: string;
    surname: string;

    public getTelegram(): string {
        this.contacts.forEach(contact => {
            if (contact.type == ContactType.TELEGRAM)
                return contact.value;
        });
        return '';
    }

    public getWhatsApp(): string {
        this.contacts.forEach(contact => {
            if (contact.type == ContactType.WHATSAPP)
                return contact.value;
        });
        return '';
    }

    public getMobileNumber() : string {
        this.contacts.forEach(contact => {
            if (contact.type == ContactType.MOBILE)
                return contact.value;
        });
        return '';
    }

    public getInstagram(): string {
        this.contacts.forEach(contact => {
            if (contact.type == ContactType.INSTAGRAM)
                return contact.value;
        });
        return '';
    }

    public setTelegram(number: string) {
        this.contacts.forEach(contact => {
            if (contact.type == ContactType.TELEGRAM) {
                contact.value = number;
                return;
            }
        });
        this.contacts.push({type: ContactType.TELEGRAM, value: number});
    }

    public setWhatsApp(number: string) {
        this.contacts.forEach(contact => {
            if (contact.type == ContactType.WHATSAPP) {
                contact.value = number;
                return;
            }
        });
        this.contacts.push({type: ContactType.WHATSAPP, value: number});
    }

    public setPhoneNumber(number: string) {
        this.contacts.forEach(contact => {
            if (contact.type == ContactType.MOBILE) {
                contact.value = number;
                return;
            }
        });
        this.contacts.push({type: ContactType.MOBILE, value: number});
    }

    public setInstagram(number: string) {
        this.contacts.forEach(contact => {
            if (contact.type == ContactType.INSTAGRAM) {
                contact.value = number;
                return;
            }
        });
        this.contacts.push({type: ContactType.INSTAGRAM, value: number});
    }

}

