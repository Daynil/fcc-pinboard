import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/toPromise";

import { User, Credentials } from './user.model';
import { handleError, parseJson, packageForPost } from './http-helpers';

@Injectable()
export class AuthService {

  creds: Credentials = {loggedIn: false, user: null};
  logEvent = new EventEmitter<Credentials>();

  constructor(private http: Http) { }

	checkCreds() {
		return this.http
              .get('/auth/checkCreds')
              .toPromise()
              .then(parseJson)
              .then(res => {
                this.creds = res;
                return this.creds;
              })
              .catch(handleError);
	}

  handleAuthLoggin() {

  }

  logout() {
    return this.http
              .get('/auth/logout')
              .toPromise()
              .then(res => {
                this.creds = {loggedIn: false, user: null};
                this.logEvent.emit(this.creds);
                return res;
              })
              .catch(handleError);
  }

}