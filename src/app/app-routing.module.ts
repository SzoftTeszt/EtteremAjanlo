import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjanlasokComponent } from './ajanlasok/ajanlasok.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {path:"signup", component:SignUpComponent},
  {path:"signin", component:SignInComponent},
  {path:"ajanlo", component:AjanlasokComponent},
  {path:"", redirectTo:'ajanlo', pathMatch:"full"},
  {path:"**", redirectTo:'ajanlo', pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
