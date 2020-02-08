import {AccountService} from '../services/account.service';
import {HttpClient} from '@angular/common/http';
import {User} from '../entities/user';

export function configurationFactory(
  http: HttpClient,
  config: AccountService) {
  return () => new Promise(resolve => {
    http.get<User>('/api/auth/self').subscribe(user => {
      config.user = user;
      resolve(true);
    }, error => {
      resolve(true);
    });
  });
}
