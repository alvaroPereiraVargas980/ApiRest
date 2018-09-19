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
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {UserPermission} from '../model/userPermission';
import { DataPermission } from '../model/dataPermission';
import { userCalendarPermission } from '../model/userCalendarPermission';
import { errorHandler } from '../../../node_modules/@angular/platform-browser/src/browser';

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
  stados=[];
  show: boolean = false;
  showUpdate: boolean=true;
  showDelete: boolean=true;
  showCollaborator: boolean=true;
  showReservations: boolean=true;
  showPermissionsUsers: boolean=true;
  id_owner:number;
  calendars$: Object;
  permissions:object;
  edited: boolean;
  date: Date;
  id:string;
  title:string;
  start:string;
  end:string;
  index:string;
  model:any;
  itemsArray = [];
  arrayTes=[];
  userPermission=[];
  storage:any;
  controlProfile:any;
  timeStart: any;
  timeEnd:any;
  hours:any;
  minutes:any;
  endPicker:any;
  owner: any;
  models: any;
  states:any;
  cale$: any;
  test2:any;
  test3:any;
  CalenUserPermission: UserPermission;
  DataPermission : DataPermission;
  userDataPermission: userCalendarPermission;
  permissionFormArray: Array<any> = [];
  categories = [ 
    {name :"update", id: 1},
    {name :"view", id: 2},
  ];
  options: DatepickerOptions = {
    locale: enLocale,
    barTitleIfEmpty: 'Click to select a date',
    displayFormat: 'YYYY-MM-DD',
    barTitleFormat: 'MMMM YYYY',
    placeholder: 'Click to select a date',
    useEmptyBarTitle: false,
    fieldId: 'datapicker',
  };
  calendarOptions: Options;
  displayEvent: any;
  description:string;
  profile:any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  @ViewChild('instance') instance: NgbTypeahead;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.stados
        : this.stados.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }
  
  constructor(private data: DataService,private auth: AuthServices) {
    this.date = new Date();
    auth.handleAuthentication(); 
  }
  ngOnInit() {
    this.edited=false;
  
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      this.fullcalendar(this.profile.nickname);
      this.idOwner(this.profile.nickname);
      this.getIdUserByNickname(this.profile.nickname);
      this.getAutocomplete();
     
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      this.fullcalendar(this.profile.nickname);
      this.idOwner(this.profile.nickname);
      this.getIdUserByNickname(this.profile.nickname);
      this.getAutocomplete();
      });
    }
    this.data.getCalendUser().subscribe(data => {
     this.calendarOptions = {
        editable: true,
        defaultDate: Date(),
        eventLimit: false,
        slotDuration:'00:15:00',
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
        this.id=mode.event.id;
        this.title=mode.event.title;
        this.start=mode.event.start;
        this.end=mode.event.end;
        this.owner=mode.event.owner;
        var CalenUser: CalendarUser={
          id:this.id,
          title:this.title,
          start:this.start,
          end:this.end,
          owner:this.profile.nickname
        };
        if(mode.event.owner === this.profile.nickname){
          this.index=mode.event.id;
          
          this.data.putCalendarUser(this.index,CalenUser).subscribe(res=>{
            console.log("updated sucessful");
          })
        }else{
          alert("you are not owner");
        }
      }
      eventResize(mode: any){
        this.id=mode.event.id;
        this.title=mode.event.title;
        this.start=mode.event.start;
        this.end=mode.event.end;
        this.owner=mode.event.owner;
        var CalenUser: CalendarUser={
          id:this.id,
          title:this.title,
          start:this.start,
          end:this.end,
          owner:this.profile.nickname
        };
        if(mode.event.owner === this.profile.nickname){
          this.index=mode.event.id;
        this.data.putCalendarUser(this.index,CalenUser).subscribe(res=>{
          console.log("updated sucessful");
        })
        } else{
          alert("you are not owner")
        }
      }
    eliminar(index: CalendarUser){
      if( confirm("are you sure wanna delete this event")){
        if( index.owner === this.profile.nickname){
      this.data.deleteCalendarUser(index.id).subscribe(res=>{
        confirm("are you sure wanna delete this event");
        alert("event deleted");
        console.log("event Deleted");
      })
    }else{
      alert("you are not owner");
    }
  }
    else{
      alert("deleted cancelled");
    }
    }
    deleteUpdate(form: NgForm){
      form.value.idUpdate= $('#idUpdate').val();
      this.index=JSON.parse(form.value.idUpdate);
      this.data.getIdPermissionByIdCalendar(JSON.stringify(this.index)).subscribe(res=>{
        var size = Object.keys(res).length;
        if(size==0){
      if(confirm("are you sure wanna delete this reservation")){
      this.data.deleteCalendarUser(JSON.stringify(this.index)).subscribe(res=>{
      })
    }
        }else{
        this.deleteCalendarPermission(res[0],this.index);
        }
      })
    }
    deleteCalendarPermission(id_permission:number, id_calendar:string){
        //console.log(id_permission, id_calendar);
        if(confirm("are you sure wanna delete this reservation with collaborators")){
      this.data.deleteCalendarByCalendarPermission(id_calendar,JSON.stringify(id_permission)).subscribe(res=>{
       this.deleteCalendarUser(id_calendar);
      });

    }  
    }
    deleteCalendarUser(id_calendar:string){
      this.data.getIdPermissionByIdCalendar(id_calendar).subscribe(res=>{
        console.log("event deleted");
      })

    }
      dayClick(mode : any) {
        $('#principal').modal('show');
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
      if(model.event.owner===this.profile.nickname){
        this.showDelete=true;
        this.showUpdate=true;
      $('#idUpdate').val(model.event.id);
      $('#titleUpdate').val(model.event.title);
      $('#startUpdate').val(model.event.start.format('YYYY-MM-DD:h:mm'));
      $('#endUpdate').val(model.event.end.format('YYYY-MM-DD:h:mm'));
      $('#ownerUpdate').val(model.event.owner);
      this.controlProfile=model.event.owner;
      $('#exampleUpdate').modal('show');
      }else{
        this.data.getPermissionByCalendar(JSON.stringify(model.event.id),JSON.stringify(this.id_owner)).subscribe(res=>{
          var size = Object.keys(res).length;
          if(size==0){
            alert("you do not have any permission");
          }else{
            this.showPermission(res,model,0);
          }
        }
        )
      }
    }
    showPermission(permission:any,model:any, i:number){
      this.showDelete=false;
      this.showUpdate=false;
      for(i=0; i<=1; i++){
        console.log(permission[0][i]);
       if(permission[0][i]=="update"){
          alert("you got update permission");
          $('#exampleUpdate').modal('show');
          $('#idUpdate').val(model.event.id);
          $('#titleUpdate').val(model.event.title);
          $('#startUpdate').val(model.event.start.format('YYYY-MM-DD:h:mm'));
          $('#endUpdate').val(model.event.end.format('YYYY-MM-DD:h:mm'));
          $('#ownerUpdate').val(model.event.owner);
          this.showUpdate=true;
          
         
        }else if(permission[0][i]=="view"){
         alert("you got view permission");
         $('#exampleUpdate').modal('show');
         $('#idUpdate').val(model.event.id);
         $('#titleUpdate').val(model.event.title);
         $('#startUpdate').val(model.event.start.format('YYYY-MM-DD:h:mm'));
         $('#endUpdate').val(model.event.end.format('YYYY-MM-DD:h:mm'));
         $('#ownerUpdate').val(model.event.owner);
        }
        }
    }
    update(form : NgForm){
      
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
     // console.log(Calen+' '+ this.index);
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
   form.value.title=$('#title').val();
    this.endPicker=$('#datapicker').val();
    console.log(form.value.title);
      var calenUser: CalendarUser={
        id:form.value.id,
        title:form.value.title,
        start:form.value.start,
        end:this.endPicker,
        owner:this.profile.nickname
      };
        this.timepicker(calenUser, form);
  }
  closeData(form : NgForm){
    this.resentForm(form);
  }
  timepicker(cale: CalendarUser, form: NgForm){
      this.timeStart = $('#startPickerPrin').val();
    
       this.timeEnd = $('#endPickerPrin').val();
      
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
        id:form.value.id,
        title:form.value.title,
        start:form.value.start +' ' +this.timeStart,
        end:this.endPicker+' ' +this.timeEnd,
        owner:this.profile.nickname
      }
     this.data.postCalendUser(cale).subscribe(res=>{
        alert("added succesfull");
      })
  } 
  getAutocomplete(){
    this.data.getAutocomplete().subscribe(res=>{
      this.getNecesaryUser(res,0);
    })
  }
  getNecesaryUser(res:any,number:number){
    var size = Object.keys(res).length;
    for(number=0;number<size;number++){
          this.stados.push(res[number]);  
    }
    //console.log(this.stados);
    this.deleteCurrentUser(this.stados,0);
  }
  deleteCurrentUser(stados:any,i:number){
    var size = Object.keys(stados).length;
    //console.log(size);
    for(i=0;i<size;i++){
      if(stados[i]==this.profile.nickname){
       var index=stados.indexOf(this.profile.nickname);
        stados.splice(index,1);
      } 
    }
    //console.log(stados);
  }
  open(id:any){
    $('#friends').modal('show');
    this.generate(id);
    this.arrayTes=[];
    this.show=false;
    this.permissionFormArray=[];
  }
  generate(id:any){
    this.data.getCalendUserId(JSON.stringify(id)).subscribe( res=>{
    this.cale$=res;
    //console.log(this.cale$);
    $('#itemDescription').val(this.cale$.title);
    $('#itemOwner').val(this.cale$.owner);
    $('#itemStart').val(this.cale$.start);
    $('#itemEnd').val(this.cale$.end);
    this.chargePermission(this.cale$.id);
    }
    )
  }
  fullcalendar(nickname: any){
    this.data.getUsersCalendar(nickname).subscribe(data=>{
      var size = Object.keys(data).length;
      if(size==0){
        this.showReservations=false;
      }else{
      this.calendars$= data
    }
    });
  }
  storagePermission(){
    this.test2= $('#typeahead-focus').val();
    this.data.getIdPermission(this.test2).subscribe(res=>{
      this.test3=res;
      //console.log(this.test3[0]);
    })
    this.show=true;
  }
  onChange(email:string, isChecked: boolean) {
    if(isChecked) {
      this.permissionFormArray.push(email);
      //console.log(this.permissionFormArray);
    } else {
      let index = this.permissionFormArray.indexOf(email);
      this.permissionFormArray.splice(index,1);
      //console.log(this.permissionFormArray);
    }
     this.CalenUserPermission={
      update_permission:this.permissionFormArray[0], 
      view_permission: this.permissionFormArray[1],
      id_user:this.test3[0],
      id_calendar:this.cale$.id
  };
  //console.log(this.CalenUserPermission);
}
postPermission(){
this.data.postPermission(this.CalenUserPermission).subscribe(res=>{
  alert("A new collaborator has been added");
})
this.permissionFormArray=[];
}
chargePermission(cale:any){
  this.data.getAllPermission(JSON.stringify(cale)).subscribe(res=>{
   
   var size = Object.keys(res).length;
   if(size==0){
    this.showPermissionsUsers=false;
   }else{
    this.countPermission(res,0);
   }
  });
}
countPermission(ArrayCale:any,count:number){
var size = Object.keys(ArrayCale).length;
  for(count=0;count<size;count++){
  this.DataPermission={
   id_permission:ArrayCale[count][0],
   update_permission:ArrayCale[count][1], 
   view_permission: ArrayCale[count][2],
   owner:ArrayCale[count][3]
  }
  this.arrayTes.push(this.DataPermission);
}
}
closeModalFriends(){
  this.permissionFormArray=[];
  this.show=false;
}
deletePermission(id_permission:any){
  if(confirm("are you sure wanna delete this permisssion??")){
    this.data.deletePermission(JSON.stringify(id_permission)).subscribe(res=>{
     alert("permission deleted");
})
}
}
idOwner(nickname:any){
  this.data.getIdPermission(nickname).subscribe(res=>{
    //console.log(res);
    this.id_owner=res[0];
  })
}
getIdUserByNickname(profile:any){
this.data.getIdPermission(profile).subscribe(res=>{
  this.getCalendarByIdUser(res[0]);
})
}
getCalendarByIdUser(calendar:any){
 this.data.getUserByPermission(calendar).subscribe(res=>{
  var size = Object.keys(res).length;
  if(size==0){
    this.showCollaborator=false;
  }else{
  this.getUserByPermission(res,0);
  }
 })
}
getUserByPermission(calendar:any, number:number){
  var size = Object.keys(calendar).length;
  for(number=0;number<size;number++){
    this.userDataPermission={
      id_calendar:calendar[number][0],
      description: calendar[number][1],
      owner: calendar[number][2]
    }
    this.userPermission.push(this.userDataPermission);
  }
  //console.log(this.userPermission);
}

}
  
