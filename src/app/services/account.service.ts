import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public user: User;

  login(username: string, password: string) {
    return this.http.post(environment.server_url+'auth/login', {username, password});
  }

  logout() {
    return this.http.get(environment.server_url+'auth/logout');
  }

  register(username: string, password: string) {
    return this.http.post(environment.server_url+'auth/register', {username, password});
  }

  constructor(private http: HttpClient) {
  }
}
