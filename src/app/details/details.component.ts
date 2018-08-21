import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from "@angular/router"
import { NgForm } from '../../../node_modules/@angular/forms';
import { Users } from '../model/users';
import { AuthServices } from '../oauth2/oauth2.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  user$: Object;
  idUpdate: string;
  constructor(private route: ActivatedRoute, private data: DataService,private router: Router,  private auth: AuthServices) { 
      this.route.params.subscribe( params=> this.user$ = params.id);
      auth.handleAuthentication();
  }
  ngOnInit() {
    this.idUpdate=JSON.parse(JSON.stringify((this.user$)));
    this.data.getUser(this.user$).subscribe(
      data=>this.user$=data
      
    );
  }
  comebackDelete(): void{
    this.router.navigate(['/user']);
  }
  deleteUser(id:string){
    if(confirm('are you sure you want to delete it')){
      this.data.deleteUser(id).subscribe(res=>{
        this.comebackDelete();
      })
    }
  }
  updateData(form : NgForm){
    if(confirm('are you sure to update data')){
   this.data.putUser(this.idUpdate,form.value).subscribe(res=>{
    this.resentForm(form);
      console.log("update successfully")
    })
  }
}
  resentForm(form? : NgForm){
    if(form){
        form.reset();
        this.data.selectedUser= new Users;
    }
  }

}
