import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { AuthService } from './shared/auth.service';
import { Credentials, User } from './shared/user.model';
import { PinService } from './shared/pin.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, AuthService, PinService]
})
export class AppComponent implements OnInit, AfterViewInit {
  
  creds: Credentials = {loggedIn: false, user: null};
  
  constructor(private authService: AuthService,
              private pinService: PinService,
              private router: Router) {
    this.authService.logEvent.subscribe( (newCreds: Credentials) => {
      this.creds = newCreds;
      console.log('creds after log event', this.creds);
      if (!this.creds.loggedIn) this.router.navigate(['']);
    });
  }

  ngOnInit() {
    this.authService.checkCreds();
    this.pinService.getAllPins();
  }

  ngAfterViewInit() {
    this.authService.checkCreds();
  }

  logout() {
    this.authService
        .logout()
        .then(res => this.router.navigate(['']));
  }

}