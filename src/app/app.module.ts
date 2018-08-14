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

@NgModule({
  declarations: [
    AppComponent,
    SlidebarComponent,
    UserComponent,
    DetailsComponent,
    LoginComponent,
    CalenApiComponent,
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    FullCalendarModule
   
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
