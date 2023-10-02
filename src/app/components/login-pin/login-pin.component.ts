import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorModel } from 'src/app/api/models';
import { AuthenticationService, OperatorsService } from 'src/app/api/services';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  constructor(private formBuilder: FormBuilder, private operatorsService: OperatorsService, private authInfoService: AuthInformationsService, private snackBar: MatSnackBar, private router: Router) { }

  /**
   * Costruzione del form alla creazione del componente
   */
    ngOnInit() {
        this.form = this.formBuilder.group({
            pin: [Validators.required]
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
     * Metodo per appendere l'ultimo numero inserito dall'utente nella casella di testo riservata al pin 
     * @param input Numero da aggiungere alla stringa numerica che rappresenta il pin immesso dall'utente
     */
    public append(input: number): void {
      (<HTMLInputElement>document.getElementById("pin")).value += input.toString();
    }

    /**
     * Metodo per cancellare il pin inserito, pulendo la casella di testo
     */
    public clear(): void {
      (<HTMLInputElement>document.getElementById("pin")).value = "";
    }

    /**
     * Metodo per rimuovere l'ultima cifra del pin inserito
     */
    public removeLast(): void {
      const element = (<HTMLInputElement>document.getElementById("pin"));
      element.value = element.value.substring(0, element.value.length-1);
    }

    /**
     * Metodo per eseguire il login, consente di salvare l'id utente nel servizio authInfoService e passare così alla visualizzazione di fasi e informazioni di controllo qualità
     * In caso di errore, gestisce l'apertura della barra di stato
     * Gestisce l'apertura della barra di caricamento
     */
  public login(): void {

    if (this.form.invalid) {
      this.openSnackBar("I dati inseriti non sono validi", "X");
      return;
    }

    // Dichiarazioni dati di autenticazione
    const token = this.authInfoService.Token;
    const pin = this.form.controls['pin'].value;

    // Dichiarazioni dettate dai modelli in /app/api/models
    const fieldName = "userpin" as "userpin" | "mes_theme_display" | "mes_theme" | "note" | "name" | "ismobileuser" | "numero_matricola" | "isactive" | "foto" | "ad_user_id" | undefined;
    const operator = "equals" as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual" | undefined;

    this.loading = true;

    const params = {
      "AdesuiteToken": token, 
      "body": {
        "startRow": 0,
        "endRow": 1,
        "criteria" : [
          {
            "fieldName": fieldName,
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
          if(this.authInfoService.UserId) {
            this.router.navigate(['dashboard']);
          }
      },
      error: response => {
        const errorDescription = (response.error as ErrorModel).description;
        this.openSnackBar(("Error " + response.status + " - " + errorDescription), "X");
        this.loading = false;
      }
    });
  }
}
