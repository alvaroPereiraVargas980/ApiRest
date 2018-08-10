import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  

  constructor(private http: HttpClient) {}
  private headers = new Headers({ 'Content-Type': 'application/json' });
    public getUsers(){
      return this.http.get('http://localhost:8080/demo/notes');
   }
   getUser(userId) {
    return this.http.get('https://jsonplaceholder.typicode.com/users/'+userId)
  }

  getPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
  }
}
