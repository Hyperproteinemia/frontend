import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../entities/user';

export function configurationFactory(
    http: HttpClient,
    config: AccountService) {
      return new Promise<void>((resolve, reject) => {
        http.get<User>('/api/auth/me')
          .subscribe(data => {config.user = data});
            resolve();
      });
  }