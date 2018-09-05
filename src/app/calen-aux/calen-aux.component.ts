import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDateStruct,NgbDate} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DatepickerOptions } from 'ng2-datepicker';
import * as enLocale from 'date-fns/locale/en';
import { DataService } from '../data.service';
import { Calendar } from '../model/calendar';

@Component({
  selector: 'app-calen-aux',
  templateUrl: './calen-aux.component.html',
  styleUrls: ['./calen-aux.component.scss']
  
})
export class CalenAuxComponent implements OnInit {
  model: NgbDateStruct;
  hoveredDate: NgbDate;
  date: Date;
  fromDate: NgbDate;
  toDate: NgbDate;
  //disabled = true;
  options: DatepickerOptions = {
    locale: enLocale,
    barTitleIfEmpty: 'Click to select a date',
    displayFormat: 'YYYY-MM-DD',
    barTitleFormat: 'MMMM YYYY',
    placeholder: 'Click to select a date',
    useEmptyBarTitle: false,
    fieldId: 'datapicker',

  };

  constructor(calendar: NgbCalendar,private data: DataService) { 
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.date = new Date();
  }
  

  ngOnInit() {
  }
  onDateSelection(date: NgbDate) {
    $('#exampleModal').modal('show');
    //$('#start').val(this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day);
    //$('#end').val(this.toDate.year+'-'+this.toDate.month+'-'+this.toDate.day);
    //$('#exampleModal').modal('show');

    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
    //$('#exampleModal').modal('show');
  }



}
