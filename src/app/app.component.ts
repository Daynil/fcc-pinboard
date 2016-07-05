import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { AuthService } from './shared/auth.service';
import { Credentials, User } from './shared/user.model';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, AuthService]
})
export class AppComponent implements OnInit, AfterViewInit {
  
  creds: Credentials = {loggedIn: false, user: null};
  
  constructor(private authService: AuthService,
              private router: Router) {
    this.authService.logEvent.subscribe( (newCreds: Credentials) => {
      let curUser: User = newCreds.user ? newCreds.user : null;
      this.creds = {
        loggedIn: newCreds.loggedIn,
        user: curUser
      }
      if (!this.creds.loggedIn) this.router.navigate(['']);
    });
  }

  ngOnInit() {
    this.authService.checkCreds();
  }

  ngAfterViewInit() {
    console.log('got here!');
    this.authService.checkCreds();
  }

  login() {
    this.authService.handleAuthLogging();
  }

  logout() {
    this.authService.logout();
  }

}