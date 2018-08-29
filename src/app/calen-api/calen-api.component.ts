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
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(private data: DataService,private auth: AuthServices) {
    this.date = new Date();
    auth.handleAuthentication();
    
  }
  ngOnInit() {
    this.data.getCalendars().subscribe(
      data=> this.calendars$= data
    );
   
    this.data.getCalendars().subscribe(data => {
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
        var Calen: Calendar={
          id:this.id,
          title:this.title,
          start:this.start,
          end:this.end
        };
        this.index=mode.event.id;
        console.log(Calen);
        this.data.putCalendar(this.index,Calen).subscribe(res=>{
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
        var Calen: Calendar={
          id:this.id,
          title:this.title,
          start:this.start,
          end:this.end
        };
        this.index=mode.event.id;
        this.data.putCalendar(this.index,Calen).subscribe(res=>{
          console.log("updated sucessful");
        })
      }
    eliminar(index: any){
      if( confirm("are you sure wanna delete this event")){
      this.data.deleteCalendar(index).subscribe(res=>{
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
      this.data.deleteCalendar(this.index).subscribe(res=>{
        console.log("delete sucessful");
      })
    }
    
      dayClick(mode : any) {
        $('#exampleModal').modal('show');
        $('#start').val(mode.date.format());
      } 
    eventClick(model: any) {
      model = {
        event: {
          id: model.event.id,
          start: model.event.start,
          end: model.event.end,
          title: model.event.title,
          allDay: model.event.allDay
      
        },
        duration: {}
      }
      $('#idUpdate').val(model.event.id);
      $('#titleUpdate').val(model.event.title);
      $('#startUpdate').val(model.event.start.format());
      $('#endUpdate').val(model.event.end.format());
      $('#exampleUpdate').modal('show');
    }
    update(form : NgForm){
      //index1=$('#idUpdate').val();
      form.value.idUpdate= $('#idUpdate').val();
      form.value.titleUpdate= $('#titleUpdate').val();
      form.value.startUpdate= $('#startUpdate').val();
      form.value.endUpdate= $('#endUpdate').val();
      var Calen: Calendar={
        id: JSON.parse(form.value.idUpdate),
        title: form.value.titleUpdate,
        start: form.value.startUpdate,
        end: form.value.endUpdate
      };
      this.index=JSON.parse(form.value.idUpdate);
      console.log(Calen+' '+ this.index);
      this.data.putCalendar(this.index,Calen).subscribe(res=>{
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
   console.log(form.value);
    this.data.postCalendar(form.value).subscribe(res=>{
      alert("Calendar created successfully.");
      
      console.log(form.value);
      this.resentForm(form);
    });
  }
  closeData(form : NgForm){
    this.resentForm(form);
  }
    
  }
