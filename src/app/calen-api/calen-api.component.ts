import { Component, OnInit,ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import * as moment from 'moment';
import { NgModel } from '../../../node_modules/@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
import * as enLocale from 'date-fns/locale/en';
import * as frLocale from 'date-fns/locale/fr';
import { NgForm } from '../../../node_modules/@angular/forms';
import { Calendar } from '../model/calendar';
import { DataService } from '../data.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { AuthServices } from '../oauth2/oauth2.service';
import {UserComponent } from '../user/user.component';
import { toInteger } from '../../../node_modules/@ng-bootstrap/ng-bootstrap/util/util';
import { CalendarUser } from '../model/calendarUser';



@Component({
  selector: 'app-calen-api',
  templateUrl: './calen-api.component.html',
  styleUrls: ['./calen-api.component.scss'],
  animations:[
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

export class CalenApiComponent implements OnInit {
  calendars$: Object;
  date: Date;
  id:string;
  title:string;
  start:string;
  end:string;
  index:string;
  model:any;
  itemsArray = [];
  storage:any;
  options: DatepickerOptions = {
    locale: enLocale,
    barTitleIfEmpty: 'Click to select a date',
    displayFormat: 'YYYY-MM-DD',
    placeholder: 'Click to select a date',
    useEmptyBarTitle: false,
    fieldId: 'datapicker',
  };

  calendarOptions: Options;
  displayEvent: any;
  description:string;
  profile:any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(private data: DataService,private auth: AuthServices) {
    this.date = new Date();
    auth.handleAuthentication();
    
  }
  ngOnInit() {
    this.data.getCalendUser().subscribe(
      data=> this.calendars$= data
    );
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
     
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
    this.data.getCalendUser().subscribe(data => {
      console.log(data);
     this.calendarOptions = {
        editable: true,
        defaultDate: Date(),
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        selectable: true,
        events:data,
       
       
      };
    });
    }
       eventDrop(mode: any){
       alert(mode.event.id+ " " +mode.event.title + " " + mode.event.start.format()+ " " + mode.event.end.format());
        this.id=mode.event.id;
        this.title=mode.event.title;
        this.start=mode.event.start.format();
        this.end=mode.event.end.format();
        var CalenUser: CalendarUser={
          id:this.id,
          title:this.title,
          start:this.start,
          end:this.end,
          owner:this.profile.nickname
        };
        this.index=mode.event.id;
        console.log(CalenUser);
        this.data.putCalendarUser(this.index,CalenUser).subscribe(res=>{
          console.log("updated sucessful");
          //console.log(Calen+" "+ this.index);
        })
      }
      eventResize(mode: any){
        alert(mode.event.id+ " " +mode.event.title + " " + mode.event.start.format()+ " " + mode.event.end.format());
        this.id=mode.event.id;
        this.title=mode.event.title;
        this.start=mode.event.start.format();
        this.end=mode.event.end.format();
        var CalenUser: CalendarUser={
          id:this.id,
          title:this.title,
          start:this.start,
          end:this.end,
          owner:this.profile.nickname
        };
        this.index=mode.event.id;
        this.data.putCalendarUser(this.index,CalenUser).subscribe(res=>{
          console.log("updated sucessful");
        })
      }
    eliminar(index: any){
      if( confirm("are you sure wanna delete this event")){
      this.data.deleteCalendarUser(index).subscribe(res=>{
        confirm("are you sure wanna delete this event");
        alert("event deleted");
        console.log("event Deleted");
      })
    }
    else{
      alert("deleted cancelled");
    }
    }
    deleteUpdate(form: NgForm){
      form.value.idUpdate= $('#idUpdate').val();
      this.index=JSON.parse(form.value.idUpdate);
      console.log(this.index);
      this.data.deleteCalendarUser(this.index).subscribe(res=>{
        console.log("delete sucessful");
      })
    }
    
      dayClick(mode : any) {
        $('#exampleModal').modal('show');
        $('#start').val(mode.date.format());
        $('#owner').val(this.profile.nickname);
      } 
    eventClick(model: any) {
      model = {
        event: {
          id: model.event.id,
          start: model.event.start,
          end: model.event.end,
          title: model.event.title,
          owner:model.event.owner,
          allDay: model.event.allDay
      
        },
        duration: {}
      }
      $('#idUpdate').val(model.event.id);
      $('#titleUpdate').val(model.event.title);
      $('#startUpdate').val(model.event.start.format());
      $('#endUpdate').val(model.event.end.format());
      $('#ownerUpdate').val(model.event.owner);
      console.log(model.event)
      $('#exampleUpdate').modal('show');
     
    }
    update(form : NgForm){
      //index1=$('#idUpdate').val();
      form.value.idUpdate= $('#idUpdate').val();
      form.value.titleUpdate= $('#titleUpdate').val();
      form.value.startUpdate= $('#startUpdate').val();
      form.value.endUpdate= $('#endUpdate').val();
      var Calen: CalendarUser={
        id: JSON.parse(form.value.idUpdate),
        title: form.value.titleUpdate,
        start: form.value.startUpdate,
        end: form.value.endUpdate,
        owner:this.profile.nickname
      };
      this.index=JSON.parse(form.value.idUpdate);
      console.log(Calen+' '+ this.index);
      this.data.putCalendarUser(this.index,Calen).subscribe(res=>{
        console.log("update successful");
      });
    }
    updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
      },
      duration: {
        _data: model.duration._data
      }
    }
  }

  resentForm(form? : NgForm){
    if(form){
        form.reset();
        this.data.selectedCalendar= new Calendar;
    }
  }
  saveData(form : NgForm){
   form.value.start=$('#start').val();
    this.data.postCalendar(form.value).subscribe(res=>{
      console.log('added Sucessfully');
    });
      
      var calenUser: CalendarUser={
        id:form.value.id,
        title:form.value.title,
        start:form.value.start,
        end:form.value.end,
        owner:this.profile.nickname
      };
      alert("Calendar created successfully.");
      console.log(calenUser);
      this.data.postCalendUser(calenUser).subscribe(res=>{
        console.log("saved successfully");
      })
  }
  closeData(form : NgForm){
    this.resentForm(form);
  }
  getDataTest(){
   
     
  

  }
    
  }
