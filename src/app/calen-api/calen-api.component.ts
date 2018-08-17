import { Component, OnInit,ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventSesrvice } from './event.service';
import * as moment from 'moment';
import { NgModel } from '../../../node_modules/@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
import * as enLocale from 'date-fns/locale/en';
import * as frLocale from 'date-fns/locale/fr';

@Component({
  selector: 'app-calen-api',
  templateUrl: './calen-api.component.html',
  styleUrls: ['./calen-api.component.scss']
})
export class CalenApiComponent implements OnInit {
  date: Date;
  
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
  constructor(protected eventService: EventSesrvice) {
    this.date = new Date();
  }
  ngOnInit() {
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
        events:  data,
       
      };
    });
    
    }
    
      dayClick(mode : any) {
        $('#exampleModal').modal('show');
        $('#startDate').val(mode.date.format());
       
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
      $('#fechaInicio').val(model.event.start);
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
  saveData(form: NgModel){
    var test=$('#startDate').val();
    console.log(test, this.date, this.description);
  
  }
    
  }
