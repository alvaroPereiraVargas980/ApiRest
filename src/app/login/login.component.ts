import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../node_modules/@angular/forms';
import { Router } from '../../../node_modules/@angular/router';
import { AuthService } from './../auth/auth.service';
import { AuthServices } from '../oauth2/oauth2.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private auth: AuthServices
  ) {     auth.handleAuthentication();}

  ngOnInit() {
  }
  login(form : NgForm){
    this.authService.login(form.value)
    }
    

    }
  

