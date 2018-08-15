import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { DataService } from '../data.service';

@Injectable()
export class AuthService {
  user$ : Object;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private data: DataService
  ) {}

  login(user: User) {
    if (user.username == 'a' && user.password == 'a' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/user']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}

