import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorModel } from 'src/app/api/models';
import { AuthenticationService } from 'src/app/api/services';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-username',
  templateUrl: './login-username.component.html',
  styleUrls: ['./login-username.component.scss']
})
export class LoginUsernameComponent implements OnInit {
  hide = true;
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private authInfoService: AuthInformationsService, private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    private openSnackBar(message: string, type: string) { 
      this.snackBar.open(message, type);
    }

  public login(): void {
    if (this.form.invalid) {
      
      return;     //aggiungere errore tramite popup
    }

    const params = {
      "body": {
        'password': this.form.controls['password'].value,
        'username': this.form.controls['username'].value
      }};

    this.authService.login(params)
    .subscribe({
      next: (response) => {
          response.token != undefined? this.authInfoService.Token = response.token : this.openSnackBar("Error 500 - Token nullo", "X") ;

      },
      error: response => {
        const errorDescription = (response.error as ErrorModel).description;
        this.openSnackBar(("Error " + response.status + " - " + errorDescription), "X");
      }
    });
  }
}
