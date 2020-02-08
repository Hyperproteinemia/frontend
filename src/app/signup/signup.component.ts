import {Component, OnInit} from '@angular/core';
import {AccountService} from '../services/account.service';
import {FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  registerControl = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    repeatPassword: new FormControl(''),
  });

  showError(errorMsg: string) {
    const errorLabel = document.getElementById('error-label');
    errorLabel.innerHTML = errorMsg;
    document.getElementById('error-label').classList.add('active');
  }

  signup() {
    const username = this.registerControl.value.username;
    const password = this.registerControl.value.password;
    const email = this.registerControl.value.email;
    const repeatPassword = this.registerControl.value.repeatPassword;
    if (password === repeatPassword) {
      this.auth.signUp(username, email, password).subscribe(success => {
        this.router.navigateByUrl('/map');
      }, error => {
        this.showError('Username is already occuied!');
      });
    } else {
      this.showError('Passwords do not match!');
    }
  }

  constructor(private auth: AccountService, private router: Router) {
  }

  ngOnInit(): void {
  }

}
