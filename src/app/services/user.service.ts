import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../entities/user';
import {Observable} from 'rxjs';
import {Contact} from '../entities/contact';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserById(username: string): Observable<User> {
    return this.http.get<User>('/api/user/' + username);
  }

  updateBio(user: User) {
    return this.http.patch<User>('api/user', user);
  }

  getContacts(username: string): Observable<Contact[]> {
    return this.http.get<Contact[]>('/api/user/' + username + '/contacts');
  }

  updateContacts(contacts: Contact[]) {
    return this.http.post('/api/user/contacts', contacts);
  }

  updateAvatar(avatar: File) {
    const body = new FormData();
    body.set('file', avatar);
    return this.http.post('/api/user/username/avatar', body);
  }

}
