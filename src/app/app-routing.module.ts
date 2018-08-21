import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { CalenApiComponent } from './calen-api/calen-api.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
 {
    path: 'login',
    component: LoginComponent
 },
 {
  path: 'details/:id',
  component: DetailsComponent,canActivate: [AuthGuard]
},
{
  path: 'user',
  component: UserComponent,canActivate: [AuthGuard]
},
{ 
  path: 'calen-api',
  component: CalenApiComponent
},
{ path: '**', redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
