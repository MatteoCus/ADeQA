import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorModel } from 'src/app/api/models';
import { AuthenticationService } from 'src/app/api/services';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * Classe che gestisce il form di login con username e password
 */
@Component({
  selector: 'app-login-username',
  templateUrl: './login-username.component.html',
  styleUrls: ['./login-username.component.scss']
})
export class LoginUsernameComponent implements OnInit {
  /**
   * Variabile booleana per cambiare l'icona che nasconde il contenuto del campo "password"
   */
  public hide: boolean = true;

  /**
   * Form di login
   */
  public form!: FormGroup;

  /**
   * Variabile booleana per far comparire la rotellina di caricamento qualora la richiesta di login impiegasse più tempo del normale
   */
  public loading : boolean = false;

  /**
   * Costruttore della classe di login
   * @param formBuilder Variabile atta alla costruzione del form a livello logico
   * @param authService Servizio di autenticazione
   * @param authInfoService Servizio per gestire le informazioni relative all'autenticazione
   * @param snackBar Barra di visualizzazione di messaggi di stato (ex. login fallito)
   */
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private authInfoService: AuthInformationsService, private snackBar: MatSnackBar) { }

  /**
   * Costruzione del form alla creazione del componente
   */
    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    /**
     * Metodo per l'apertura della barra di visualizzazione di messaggi di stato
     * @param message Messaggio da mostrare
     * @param type Etichetta del pulsante di chiusura
     */
    private openSnackBar(message: string, type: string): void { 
      this.snackBar.open(message, type, {
        panelClass: ['red-snackbar','login-snackbar'],
        });
    }

    /**
     * Metodo per eseguire il login, consente di salvare il token in localStorage e passare, in caso di successo, al login tramite pin
     * In caso di errore, gestisce l'apertura della barra di stato
     * In caso la richiesta impiegasse un tempo eccessivamente lungo, gestisce l'apertura della barra di caricamento
     */
  public login(): void {
    if (this.form.invalid) {
      this.openSnackBar("Inserire tutti i dati richiesti", "X");
      return;
    }

    setTimeout(() => {this.loading = true;},700);

    const params = {
      "body": {
        'password': this.form.controls['password'].value,
        'username': this.form.controls['username'].value
      }};

    this.authService.login(params)
    .subscribe({
      next: (response) => {
          response.token != undefined? this.authInfoService.Token = response.token : this.openSnackBar("Error 500 - Token nullo", "X");
          this.loading = false;
      },
      error: response => {
        const errorDescription = (response.error as ErrorModel).description;
        this.openSnackBar(("Error " + response.status + " - " + errorDescription), "X");
        this.loading = false;
      }
    });
  }
}
