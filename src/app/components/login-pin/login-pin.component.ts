import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorModel } from 'src/app/api/models';
import { AuthenticationService, OperatorsService } from 'src/app/api/services';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * Classe che gestisce il form di login con username e password
 */
@Component({
  selector: 'app-login-pin',
  templateUrl: './login-pin.component.html',
  styleUrls: ['./login-pin.component.scss']
})
export class LoginPinComponent implements OnInit {

  /**
   * Form di login
   */
  public form!: FormGroup;

  /**
   * Variabile booleana per far comparire la rotellina di caricamento qualora la richiesta di login impiegasse più tempo del normale
   */
  public loading : boolean = false;

  /**
   * Costruttore della classe di login con pin
   * @param formBuilder Variabile atta alla costruzione del form a livello logico
   * @param authService Servizio di autenticazione
   * @param authInfoService Servizio per gestire le informazioni relative all'autenticazione
   * @param snackBar Barra di visualizzazione di messaggi di stato (ex. login fallito)
   */
  constructor(private formBuilder: FormBuilder, private operatorsService: OperatorsService, private authInfoService: AuthInformationsService, private snackBar: MatSnackBar) { }

  /**
   * Costruzione del form alla creazione del componente
   */
    ngOnInit() {
        this.form = this.formBuilder.group({
            pin: [Validators.required, Validators.minLength(4), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
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
     * Metodo per eseguire il login, consente di salvare l'id utente nel servizio authInfoService e passare così alla visualizzazione di fasi e informazioni di controllo qualità
     * In caso di errore, gestisce l'apertura della barra di stato
     * In caso la richiesta impiegasse un tempo eccessivamente lungo, gestisce l'apertura della barra di caricamento
     */
  public login(): void {

    if (this.form.invalid) {
      this.openSnackBar("Inserire un PIN di almeno 4 cifre", "X");
      return;
    }

    // Dichiarazioni dati di autenticazione
    const token = this.authInfoService.Token;
    const pin = this.form.controls['pin'].value;

    // Dichiarazioni dettate dai modelli in /app/api/models
    const fieldName = "userpin" as "userpin" | "mes_theme_display" | "mes_theme" | "note" | "name" | "ismobileuser" | "numero_matricola" | "isactive" | "foto" | "ad_user_id" | undefined;
    const operator = "equals" as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual" | undefined;

    setTimeout(() => {this.loading = true;},700);

    const params = {
      "AdesuiteToken": token, 
      "body": {
        "startRow": 0,
        "endRow": 0,
        "criteria" : [
          {
            "fieldName": fieldName ,
            "value": pin,
            "operator": operator
          }
        ]
      }};

    this.operatorsService.fetch(params)
    .subscribe({
      next: (response) => {
          (response.data != undefined && response.data[0].ad_user_id != undefined)? this.authInfoService.UserId = response.data[0].ad_user_id : this.openSnackBar("Il PIN inserito non appartiene ad alcun utente", "X");
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
