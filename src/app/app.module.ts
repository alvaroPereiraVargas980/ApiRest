import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { UserComponent } from './user/user.component';
import { DetailsComponent } from './details/details.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from 'ng-fullcalendar';
import { CalenApiComponent } from './calen-api/calen-api.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import * as $AB from 'jquery';
import * as bootstrap from "bootstrap";
import * as moment from 'moment';
import { NgDatepickerModule } from 'ng2-datepicker';
import { CalenAuxComponent } from './calen-aux/calen-aux.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthServices } from '../app/oauth2/oauth2.service';

@NgModule({
  declarations: [
    AppComponent,
    SlidebarComponent,
    UserComponent,
    DetailsComponent,
    LoginComponent,
    CalenApiComponent,
    CalenAuxComponent,
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    FullCalendarModule,
    NgDatepickerModule,
    NgbModule
   
  ],
  providers: [AuthService, AuthGuard, AuthServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
