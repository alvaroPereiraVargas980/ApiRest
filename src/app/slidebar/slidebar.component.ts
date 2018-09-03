import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AuthServices } from '../oauth2/oauth2.service';


@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss'],

})
export class SlidebarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  currentUrl: string;
  constructor(private router: Router,private authService: AuthService,private auth: AuthServices) {
   
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = this.router.url);
    auth.handleAuthentication();
}

ngOnInit() {
  this.isLoggedIn$ = this.authService.isLoggedIn;
}

onLogout() {
  this.authService.logout();
}

  

}
