import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Users } from '../model/users';
import { NgForm } from '../../../node_modules/@angular/forms';
import { Router } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  user : [Users];
  constructor(private data: DataService,private router: Router) { }

  ngOnInit() {
  }
  login(){
    if(this.username == "alvaro" && this.password == "alvaro123"){
      this.router.navigate(['/user']);
    }else {
        alert ("user or password Incorrect")
    }

    }
  }

