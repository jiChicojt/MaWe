import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequestModel } from 'src/app/models/login-request.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error = false;
  err = '';
  opened = false;

  loginRequest: LoginRequestModel = {
    email: '',
    password: ''
  };
  rememberMe = false;
  public formGroup: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  login() {
    this.authService.login(this.loginRequest).subscribe(
      user => {
        const token = user.token;
        delete user.token;
        if (this.rememberMe) {
          localStorage.setItem('identity', JSON.stringify(user));
          localStorage.setItem('token', token);
        } else {
          sessionStorage.setItem('identity', JSON.stringify(user));
          sessionStorage.setItem('token', token);
        }
        this.router.navigate(['enterprise/']);
      },
      error => {
        this.error = true;
        this.err = error.error.message;
        console.log(error);
      }
    );
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      enterprise: ['', Validators.required]
    });
  }

  register() {
    this.authService.signup(this.formGroup.value).subscribe(
        success => {
          console.log(success);
          this.loginRequest = {
            email: this.formGroup.get('email').value,
            password: this.formGroup.get('password').value
          };
          this.login();
        },
        err => {
          console.log(err);
        }
    );
  }
}
