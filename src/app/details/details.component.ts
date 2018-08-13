import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from "@angular/router"
import { NgForm } from '../../../node_modules/@angular/forms';
import { Users } from '../model/users';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  username : string;
  password: string;
  user$: Object;
  constructor(private route: ActivatedRoute, private data: DataService,private router: Router) { 
      this.route.params.subscribe( params=> this.user$ = params.id);
  }
  ngOnInit() {
    this.data.getUser(this.user$).subscribe(
      data=>this.user$=data
    );
  }
  comebackDelete(): void{
    this.router.navigate(['']);
  }
  deleteUser(id:string){
    if(confirm('are you sure you want to delete it')){
      this.data.deleteUser(id).subscribe(res=>{
        this.comebackDelete();
      })
    }
  }
  updateData(form : NgForm){
   this.data.putUser(form.value).subscribe(res=>{
      console.log("update successfully")
    })
   console.log(form.value);
  }
  resentForm(form? : NgForm){
    if(form){
        form.reset();
        this.data.selectedUser= new Users;
    }
  }
  chargeData(id: string){
    console.log(id);
  }

}
