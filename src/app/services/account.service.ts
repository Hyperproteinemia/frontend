import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../entities/user';
import {map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public user: User;

  public login(username: string, password: string) {
    return this.http.post('/api/auth/login', {username, password}, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response' as 'body'
    }).pipe(
      mergeMap((res: Response) => {
        localStorage.setItem('token', res.headers.get('Authorization'));
        return this.http.get<User>('/api/auth/self');
      })
    );
  }

  public logout() {
    return this.http.get('/api/auth/logout');
  }

  public signUp(username: string, password: string) {
    return this.http.post('/api/auth/signup', {username, password});
  }

  constructor(private http: HttpClient) {
  }
}
