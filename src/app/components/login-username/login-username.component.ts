import { Component } from '@angular/core';

@Component({
  selector: 'app-login-username',
  templateUrl: './login-username.component.html',
  styleUrls: ['./login-username.component.scss']
})
export class LoginUsernameComponent {
  hide = true;

  public login(): void {
    console.log("login")
  }
}
