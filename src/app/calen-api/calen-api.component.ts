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
        defaultDate: Date(),
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        selectable: true,
        events: [
        {
          title: 'All Day Event',
          start: '2018-08-25'
        },
        {
          title: 'Repeating Event',
          start: '2018-08-09T16:00:00'
        }
      ],
      dayClick: function(date, JavaScriptEvent, view){
        alert(date);
        //$("#exampleModal").modal('show');
        //$('#fechaInicio').val(date.format());
        //alert('Click in day click' + '' + 'date.format()');
      }
      };
    }
}
