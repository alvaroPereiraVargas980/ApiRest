import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { NgForm } from '../../../node_modules/@angular/forms';
import { Users } from '../model/users';
import { Router } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class UserComponent implements OnInit {
  users$: Object;
  constructor(private data: DataService,private router: Router) { }
  
  ngOnInit() {
    this.data.getUsers().subscribe(
      data=> this.users$= data
    );
  }
  resentForm(form? : NgForm){
    if(form){
        form.reset();
        this.data.selectedUser= new Users;
    }
  }
  comeBack(): void{
    location.reload();
  }
  add_user(form : NgForm){
    this.data.postUser(form.value).subscribe(res=>{
      alert("User created successfully.");
      console.log(form.value);
      this.resentForm(form);
      this.comeBack();
    })
  
  }
}
