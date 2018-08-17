import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-calen-aux',
  templateUrl: './calen-aux.component.html',
  styleUrls: ['./calen-aux.component.scss']
})
export class CalenAuxComponent implements OnInit {
  model: NgbDateStruct;
  //disabled = true;
  constructor(calendar: NgbCalendar) { 
    this.model = calendar.getToday();
  }

  ngOnInit() {
  }

}
