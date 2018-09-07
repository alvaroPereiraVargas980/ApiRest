import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDateStruct,NgbDate} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DatepickerOptions } from 'ng2-datepicker';
import * as enLocale from 'date-fns/locale/en';
import { DataService } from '../data.service';
import { Calendar } from '../model/calendar';
import { AuthServices } from '../oauth2/oauth2.service';
import { NgForm } from '../../../node_modules/@angular/forms';
import { CalendarUser } from '../model/calendarUser';

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
  owner: any;
  profile:any;
  timeStart: any;
  timeEnd:any;
  hours:any;
  minutes:any;
  startPicker:any;
  endPicker:any;


  options: DatepickerOptions = {
    locale: enLocale,
    barTitleIfEmpty: 'Click to select a date',
    displayFormat: 'YYYY-MM-DD',
    barTitleFormat: 'MMMM YYYY',
    placeholder: 'Click to select a date',
    useEmptyBarTitle: false,
    fieldId: 'datapicker',
  };
  constructor(calendar: NgbCalendar,private data: DataService,private auth: AuthServices) { 
    this.fromDate = calendar.getToday();
    
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 0);
    this.date = new Date();
  }
  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
     
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
  }
}
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      //console.log(this.toDate.year+'-'+this.toDate.month+'-'+this.toDate.day);
      $('#modalCale-aux').modal('show');
      $('#startAux').val(this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day);
      $('#endAux').val(this.toDate.year+'-'+this.toDate.month+'-'+this.toDate.day);
      $('#ownerAux').val(this.profile.nickname);
    } else {
      this.toDate = null;
      this.fromDate = date;
      //console.log(this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day);
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
  }

  saveData(form : NgForm){
   this.startPicker= $('#startAux').val();
    this.endPicker=$('#endAux').val();
    console.log(form.value);
       var calenUser: CalendarUser={
         id:form.value.idAux,
         title:form.value.titleAux,
         start:form.value.startAux,
         end:form.value.endAux,
         owner:form.value.ownerAux
       };
         this.timepicker(calenUser, form);
   }
  timepicker(cale: CalendarUser, form: NgForm){
    this.timeStart = $('#startPicker').val();
  
     this.timeEnd = $('#endPicker').val();
    
       this.hours = this.timeStart.split(':')[0] - this.timeEnd.split(':')[0];
      this.minutes = this.timeStart.split(':')[1] - this.timeEnd.split(':')[1];
    
    this.minutes = this.minutes.toString().length<2?'0'+this.minutes:this.minutes;
    if(this.minutes<0){ 
        this.hours--;
        this.minutes = 60 + this.minutes;
    }
    this.hours = this.hours.toString().length<2?'0'+this.hours:this.hours;
    //$('#delay').val(this.hours + ':' + this.minutes);
    //console.log(this.hours+ ':' + this.minutes);
    //console.log(this.timeStart + ':' + this.timeEnd);
    
    cale={
      id:form.value.idAux,
      title:form.value.titleAux,
      start:this.startPicker +' ' +this.timeStart,
      end:this.endPicker+' ' +this.timeEnd,
      owner:this.profile.nickname
    }
    //this.data.postCalendUser(cale).subscribe(res=>{
     // alert("added succesfull");
      console.log(cale);
   //})
} 
resentForm(form? : NgForm){
  if(form){
      form.reset();
      this.data.selectedCalendar= new Calendar;
  }
}
closeData(form : NgForm){
  this.resentForm(form);
}

}
