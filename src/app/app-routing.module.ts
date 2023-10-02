import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUsernameComponent } from './components/login-username/login-username.component';
import { LoginPinComponent } from './components/login-pin/login-pin.component';

const routes: Routes = [
  { path: '', redirectTo: '/login/username', pathMatch: 'full' },
  { path: 'login/username', component: LoginUsernameComponent},
  { path: 'login/pin', component: LoginPinComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
