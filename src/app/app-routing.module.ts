import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
 {
    path: '',
    component: LoginComponent
 },
 {
  path: 'details/:id',
  component: DetailsComponent
},
{
  path: 'user',
  component: UserComponent
},
{
  path:'calendar',
  component: CalendarComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
