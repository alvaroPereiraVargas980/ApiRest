import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from './model/users';
import { Calendar } from './model/calendar';
import {CalendarUser} from './model/calendarUser';
import { UserPermission } from './model/userPermission';


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

getUsersCalendar(userName: string){
  return this.http.get('http://localhost:8080/GetUserCalendar/'+userName);
}
getpermission(){
  return this.http.get('http://localhost:8080/GetUserP');
}

//this section belows to CalendarUser section 
  postCalendUser(calen : CalendarUser){
    return this.http.post('http://localhost:8080/CreateCalendarUsers',calen)
  }
  getCalendUser(){
    return this.http.get('http://localhost:8080/GetCalendarUsers')
  }
  getCalendUserId(id :string){
    return this.http.get('http://localhost:8080/GetsCalendarUsers/'+ id)
  }
  putCalendarUser(id: string,calendar: Calendar){
    return this.http.put('http://localhost:8080/PutCalendarUsers/'+ id, calendar);
  }
  deleteCalendarUser(id :string){
    return this.http.delete('http://localhost:8080/DeleteCalendarUsers'+ `/${id}`);
  }
  getAutocomplete(){
    return this.http.get('http://localhost:8080/GetAutocomplete');
  }
  //permission section


  getIdPermission(nickname:string){
    return this.http.get('http://localhost:8080/GetIdPermission/'+ nickname);
  }
  postPermission(user : UserPermission){
    return this.http.post('http://localhost:8080/CreatePermission/',user);
  }
  getAllPermission(id_calendar:string){
    //console.log(id_calendar);
    return this.http.get('http://localhost:8080/GetIdCalendar/'+id_calendar);
  }
  }

//this section belows to Calendar section

