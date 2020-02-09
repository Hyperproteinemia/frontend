import {Answer} from './answer';

export class Question {
  text: string;
  username?: string;
  id?: number;
  answers?: Answer[];
}
