import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from './model/users';
import { Calendar } from './model/calendar';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedCalendar: Calendar;
  calendar: Calendar[];
  selectedUser: Users;
  user: Users[];
  
  private header = new Headers({'content-type':'application/json'});
  constructor(private http: HttpClient) {
    this.selectedUser = new Users();
    this.selectedCalendar= new Calendar();
  }

  private headers = new Headers({ 'Content-Type': 'application/json' });
   getUsers(){
      return this.http.get('http://localhost:8080/User/GetUser');
   }
   getUser(userId) {
      return this.http.get('http://localhost:8080/User/GetUser/'+userId)
  }
  postUser(User : Users){
    return this.http.post('http://localhost:8080/User/CreateUser',User);
  }
  putUser(id: string,User : Users){
      return this.http.put('http://localhost:8080/User/PutUser/'+ id, User);
  }
  deleteUser(_id : string){
      return this.http.delete('http://localhost:8080/User/DeleteUser'+ `/${_id}`);
  }
  getCalendars(){
    return this.http.get('http://localhost:8080/Calendar/GetCalendar');
  }
  getCalendar(calendarId) {
    return this.http.get('http://localhost:8080/Calendar/GetsCalendar/'+calendarId)
}
postCalendar(calendar: Calendar){
  return this.http.post('http://localhost:8080/Calendar/CreateCalendar',calendar);
}
putCalendar(id: string,calendar: Calendar){
  return this.http.put('http://localhost:8080/Calendar/PutCalendar/'+ id, calendar);
}
deleteCalendar(id :string){
  return this.http.delete('http://localhost:8080/Calendar/DeleteCalendar'+ `/${id}`);
}

}
