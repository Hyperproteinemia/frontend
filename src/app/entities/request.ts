import { User } from './user';

export class Request {
    message: string;
    confirmed: boolean;
    date: Date;
    to: string;
    from: User;
}
