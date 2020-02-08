export class Article {
  id?: number;
  content: string;
  username?: string;
  heading: string;
  usersToLike?: string[];
  tags?: { id: number, name: string }[];
  lastUpdate?: {
    epochSecond: number,
    nano: number
  };
}
