import { Component, OnInit,ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
 


@Component({
  selector: 'app-calen-api',
  templateUrl: './calen-api.component.html',
  styleUrls: ['./calen-api.component.scss']
})
export class CalenApiComponent implements OnInit {
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor() {}
  ngOnInit() {
     this.calendarOptions = {
        editable: true,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        //events: data
      };
  }
 
}
