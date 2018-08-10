import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss']
})
export class SlidebarComponent implements OnInit {
  currentUrl: string;
  constructor(private router: Router) {
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = this.router.url);
}

  ngOnInit() {
  }

}
