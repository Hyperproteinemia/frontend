import {Component, OnInit} from '@angular/core';
import {AccountService} from '../services/account.service';
import {FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../entities/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginControl = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private auth: AccountService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    this.auth.login(this.loginControl.value.username, this.loginControl.value.password).subscribe(user => {
        this.auth.user = user;
        this.router.navigateByUrl('/map');
      },
      error => {
        document.getElementById('error-label').classList.add('active');
      });
  }

}
