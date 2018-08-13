import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from './model/users';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedUser: Users;
  user: Users[];
  private header = new Headers({'content-type':'application/json'});
  constructor(private http: HttpClient) {
    this.selectedUser = new Users();
  }

  private headers = new Headers({ 'Content-Type': 'application/json' });
   getUsers(){
      return this.http.get('http://localhost:8080/demo/notes');
   }
   getUser(userId) {
      return this.http.get('http://localhost:8080/demo/notes/'+userId)
  }
  postUser(User : Users){
    return this.http.post('http://localhost:8080/demo/create',User);
  }
  putUser(User : Users){
      return this.http.put('http://localhost:8080/demo/notes'+ `/${User._id}`, User);
  }
  deleteUser(_id : string){
      return this.http.delete('http://localhost:8080/demo/notes'+ `/${_id}`);
  }

}
