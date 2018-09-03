import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from './model/users';
import { Calendar } from './model/calendar';
import {CalendarUser} from './model/calendarUser';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedCalendar: Calendar;
  selectedCalendarUser: CalendarUser;
  calendar: Calendar[];
  selectedUser: Users;
  user: Users[];
  caleUser: CalendarUser[];
  
  private header = new Headers({'content-type':'application/json'});
  constructor(private http: HttpClient) {
    this.selectedUser = new Users();
    this.selectedCalendar= new Calendar();
    this.selectedCalendarUser=new CalendarUser();
  }

  private headers = new Headers({ 'Content-Type': 'application/json' });

  //this section belows to User section
   getUsers(){
      return this.http.get('http://localhost:8080/GetUsers');
   }
   getUser(userId) {
      return this.http.get('http://localhost:8080/GetUsers/'+userId)
  }
  postUser(User : Users){
    return this.http.post('http://localhost:8080/CreateUsers',User);
  }
  putUser(id: string,User : Users){
    return this.http.put('http://localhost:8080/PutUsers/'+ id, User);
}
deleteUser(_id : string){
  return this.http.delete('http://localhost:8080/DeleteUsers'+ `/${_id}`);
}
//this section belows to CalendarUser section 
  postCalendUser(calen : CalendarUser){
    return this.http.post('http://localhost:8080/CreateCalendarUsers',calen)
  }
  getCalendUser(){
    return this.http.get('http://localhost:8080/GetCalendarUsers')
  }
  putCalendarUser(id: string,calendar: Calendar){
    return this.http.put('http://localhost:8080/PutCalendarUsers/'+ id, calendar);
  }
  deleteCalendarUser(id :string){
    return this.http.delete('http://localhost:8080/DeleteCalendarUsers'+ `/${id}`);
  }
//this section belows to Calendar section
  
 
  getCalendars(){
    return this.http.get('http://localhost:8080/GetCalendars');
  }
  getCalendar(calendarId) {
    return this.http.get('http://localhost:8080/GetsCalendars/'+calendarId)
}
postCalendar(calendar: Calendar){
  return this.http.post('http://localhost:8080/CreateCalendars',calendar);
}
putCalendar(id: string,calendar: Calendar){
  return this.http.put('http://localhost:8080/PutCalendars/'+ id, calendar);
}
deleteCalendar(id :string){
  return this.http.delete('http://localhost:8080/DeleteCalendars'+ `/${id}`);
}

}
