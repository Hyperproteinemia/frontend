export class Article {
  id?: number;
  content: string;
  username?: string;
  heading: string;
  usersToLike?: string[];
  lastUpdate?: {
    epochSecond: number,
    nano: number
  };
}
