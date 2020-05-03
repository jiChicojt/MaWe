import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';
import { Observable } from 'rxjs';
import { LoginRequestModel } from '../models/login-request.model';
import { UsersModel } from '../models/user.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string;
  thyHeaders;

  constructor(private http: HttpClient, private jwtService: JwtHelperService) {
    this.url = GLOBAL.URL;
    this.thyHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  }

  login(loginRequest: LoginRequestModel): Observable<any> {
    const params = JSON.stringify(loginRequest);
    return this.http.post(this.url + 'login', params, { headers: this.thyHeaders });
  }

  signup(user: UsersModel): Observable<any> {
    const params = JSON.stringify(user);
    return this.http.post(this.url + 'signup', params, { headers: this.thyHeaders });
  }

  getToken(): string {
    let uToken = '';
    if (!!localStorage.getItem('token')) {
      uToken = isNotNullOrUndefined(localStorage.getItem('token')) ? localStorage.getItem('token') : '';
    } else if (!!sessionStorage.getItem('token')) {
      uToken = isNotNullOrUndefined(sessionStorage.getItem('token')) ? sessionStorage.getItem('token') : '';
    }
    return uToken;
  }

  getIdentity(): UsersModel {
    let identity: UsersModel;
    if (!!localStorage.getItem('identity')) {
      identity = isNotNullOrUndefined(localStorage.getItem('identity')) ? JSON.parse(localStorage.getItem('identity')) : '';
    } else if (!!sessionStorage.getItem('identity')) {
      identity = isNotNullOrUndefined(sessionStorage.getItem('identity')) ? JSON.parse(sessionStorage.getItem('identity')) : '';
    }
    return identity;
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !this.jwtService.isTokenExpired(token);
  }
}
