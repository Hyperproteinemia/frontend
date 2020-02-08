import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entities/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(username: string) : Observable<User> {
    return this.http.get<User>('/api/user/'+username);
  }

}
