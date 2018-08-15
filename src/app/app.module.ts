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
import { CalendarComponent } from './calendar/calendar.component'; 
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SlidebarComponent,
    UserComponent,
    DetailsComponent,
    LoginComponent,
    CalendarComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
