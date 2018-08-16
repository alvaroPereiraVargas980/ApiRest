import { Component, OnInit,ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventSesrvice } from './event.service';
import * as moment from 'moment';

@Component({
  selector: 'app-calen-api',
  templateUrl: './calen-api.component.html',
  styleUrls: ['./calen-api.component.scss']
})
export class CalenApiComponent implements OnInit {
  calendarOptions: Options;
  displayEvent: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(protected eventService: EventSesrvice) {}
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
        $('#fechaInicio').val(mode.date.format());
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
      //$('#descripcion').val(model.event.allDay);
      this.displayEvent = model;
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
    this.displayEvent = model;
  }
    
  }
