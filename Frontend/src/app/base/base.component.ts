import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  private error = false;
  private dashActive = 'active';
  private jobsActive = 'inactive';
  collapsed = true;

  identity = new UsersModel(' ', '', '', '');

  constructor(private authService: AuthService,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.identity = this.authService.getIdentity();
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['home']);
  }

}
