import { Component,OnInit } from '@angular/core';
import { AuthServices } from '../app/oauth2/oauth2.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'practice';
  constructor(private auth: AuthServices){  
    auth.handleAuthentication();
  }
}
