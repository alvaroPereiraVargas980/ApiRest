import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DetailsComponent } from './details/details.component';
import { PostComponent } from './post/post.component';
const routes: Routes = [
 {
    path: '',
    component: UserComponent
 },
 {
  path: 'details/:id',
  component: DetailsComponent
},
{
  path: 'post',
  component: PostComponent
},   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
