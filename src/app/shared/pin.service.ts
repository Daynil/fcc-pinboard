import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/toPromise";
import _ = require('lodash');

import { User } from './user.model';
import { Pin } from './pin.model';
import { handleError, parseJson, packageForPost } from './http-helpers';
import { AuthService } from './auth.service';

@Injectable()
export class PinService {

  pins: Pin[] = [];
  userPins: Pin[] = [];

  constructor(private http: Http,
              private authService: AuthService) {
    this.authService.logEvent.subscribe(logged => {
      this.refreshUserPins();
    });
  }

  submitPin(title: string, url: string) {
    let user = this.authService.creds.user.username;
    let pin: Pin = {
      title: title,
      imageUrl: url,
      likes: [],
      owner: user
    };
    this.pins.push(pin);
    this.refreshUserPins();
    let pkg = packageForPost(pin);
    return this.http
              .post('/api/pin', pkg.body, pkg.opts)
              .toPromise()
              .then(parseJson)
              .catch(handleError);
  }

  deletePin(pin: Pin) {
    this.pins.splice(this.pins.indexOf(pin), 1);
    this.refreshUserPins();
    let pkg = packageForPost(pin);
    return this.http
              .post('/api/deletepin', pkg.body, pkg.opts)
              .toPromise()
              .then(parseJson)
              .catch(handleError);
  }


  likePin(pin: Pin) {
    if (!this.authService.creds.loggedIn) {
      console.log('Not logged in');
      return;
    }
    let user = this.authService.creds.user.username;
    let data = {
      pin: pin,
      liker: user
    };
    let likedPin = _.find(this.pins, d => d.imageUrl === pin.imageUrl);
    let alreadyLiked = _.find(likedPin.likes, d => d === user);
    if (typeof alreadyLiked !== 'undefined') {
      let likerIndex = likedPin.likes.indexOf(alreadyLiked);
      likedPin.likes.splice(likerIndex, 1);
    } else {
      likedPin.likes.push(user);
    }
    this.refreshUserPins();
    let pkg = packageForPost(data);
    return this.http
              .post('/api/like', pkg.body, pkg.opts)
              .toPromise()
              .then(parseJson)
              .catch(handleError);
  }

  getAllPins() {
    return this.http
              .get('/api/allpins')
              .toPromise()
              .then(parseJson)
              .then((pins: Pin[]) => {
                this.pins = pins;
                this.refreshUserPins();
                return pins;
              })
              .catch(handleError);
  }

  refreshUserPins() {
    if (!this.authService.creds.loggedIn) return;
    this.userPins = _.filter(this.pins, d => d.owner === this.authService.creds.user.username);
  }

}