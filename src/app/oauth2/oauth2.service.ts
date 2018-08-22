import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
(window as any).global = window;

@Injectable()
export class AuthServices {
  userProfile:any;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  auth0 = new auth0.WebAuth({
    clientID: 'fpM00u7xdEB8_k1pOaoQbkCJsqbbOYh3',
    domain: 'alva.auth0.com',
    responseType: 'token id_token',
    audience: 'https://alva.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile' 
  });

  constructor(public router: Router) {}
  
  public login(): void {
    this.auth0.authorize();
  }
  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/calen-api']);
        this.loggedIn.next(true);
        console.log(authResult.idToken);
      } else if (err) {
        this.router.navigate(['/login']);
        console.log(err);
      }
    });
  }
  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token',authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    //here I added th fucntion to remove the localStrore
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }
  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }
  
    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

}

