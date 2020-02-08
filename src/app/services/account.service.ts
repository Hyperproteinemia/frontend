import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public user: User;

  login(username: string, password: string) {
    return this.http.post('/api/auth/login', {username, password});
  }

  logout() {
    this.user = undefined;
    return this.http.get('/api/auth/logout');
  }

  register(username: string, email: string, password: string) {
    return this.http.post('/api/auth/signup', {username, email, password});
  }

  constructor(private http: HttpClient) {
  }
}
