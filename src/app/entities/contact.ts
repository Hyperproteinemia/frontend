export enum ContactType {
    TELEGRAM, WHATSAPP, MOBILE, INSTAGRAM
}

export class Contact {

    public type: ContactType;
    public value: string;

};