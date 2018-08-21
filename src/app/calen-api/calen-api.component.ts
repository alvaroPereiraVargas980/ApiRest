import { Component, OnInit,ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventSesrvice } from './event.service';
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
  heroes= [];
  options: DatepickerOptions = {
    locale: enLocale,
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date',
    useEmptyBarTitle: false,
    fieldId: 'datapicker',
  };

  calendarOptions: Options;
  displayEvent: any;
  description:string;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(protected eventService: EventSesrvice,private data: DataService,private auth: AuthServices) {
    this.date = new Date();
    auth.handleAuthentication();
  }
  ngOnInit() {
    this.data.getCalendars().subscribe(
      data=> this.calendars$= data
    );
    this.heroes.push(this.calendars$);
    this.eventService.getEvents().subscribe(data => {
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
       alert(mode.event.title + " " + mode.event.start.format()+ " " + mode.event.end.format());
       console.log(mode.event.title + " " + mode.event.start.format()+ " " + mode.event.end.format());
       
      
    }
    
      dayClick(mode : any) {
        $('#exampleModal').modal('show');
        $('#start').val(mode.date.format());
       
      } 
      clickButton(model: any) {
        this.displayEvent = model;
      }
    eventClick(model: any) {
      $('#exampleModal').modal('show');
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
      $('#title').val(model.event.title);
      $('#start').val(model.event.start);
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
    //this.displayEvent = model;
  }

  resentForm(form? : NgForm){
    if(form){
        form.reset();
        this.data.selectedCalendar= new Calendar;
    }
  }
  saveData(form : NgForm){
    console.log(form.value);
    this.data.postCalendar(form.value).subscribe(res=>{
      alert("Calendar created successfully.");
      console.log(form.value);
      this.resentForm(form);
    });
  }
    
  }
