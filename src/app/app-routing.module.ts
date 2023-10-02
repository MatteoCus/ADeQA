import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUsernameComponent } from './components/login-username/login-username.component';
import { LoginPinComponent } from './components/login-pin/login-pin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login/username', pathMatch: 'full' },
  { path: 'login/username', component: LoginUsernameComponent},
  { path: 'login/pin', component: LoginPinComponent},
  { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
