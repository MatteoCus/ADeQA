import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorModel } from 'src/app/api/models';
import { AuthenticationService, OperatorsService } from 'src/app/api/services';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Fetch$Params } from 'src/app/api/fn/operators/fetch';

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
   * Costruttore della classe di login con pin: evita di renderizzare la pagina se non si è prima ottenuto il token
   * Reindirizza alla dashboard qualora vi fosse già una sessione attiva
   * @param formBuilder Variabile atta alla costruzione del form a livello logico
   * @param authService Servizio di autenticazione
   * @param authInfoService Servizio per gestire le informazioni relative all'autenticazione
   * @param snackBar Barra di visualizzazione di messaggi di stato (ex. login fallito)
   * @param router Router per eseguire dei reindirizzamenti su browser
   */
  constructor(private formBuilder: FormBuilder, private operatorsService: OperatorsService, private authInfoService: AuthInformationsService, private snackBar: MatSnackBar, private router: Router) {
    if(localStorage.getItem('ADeToken') == null ||  localStorage.getItem('ADeToken') == "") {
      this.router.navigate(['login/username']);
    }

    if(sessionStorage.getItem('ADeUserId')!= "" && sessionStorage.getItem('ADeUserId')!= null && sessionStorage.getItem('ADeUserId') as any as number != 0
    && sessionStorage.getItem('ADeUserName')!="" && sessionStorage.getItem('ADeUserName')!= null) {
      this.authInfoService.UserId = sessionStorage.getItem('ADeUserId') as any as number;
      this.fetchUserInfo();
      this.router.navigate(['dashboard']);
    }
   }

  /**
   * Costruzione del form alla creazione del componente
   */
    ngOnInit() {
        this.form = this.formBuilder.group({
          pin: ['', Validators.required]
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
     * Metodo per preparare i parametri per le richieste relative agli operatori
     * @param token Token di autenticazione per eseguire la chiamata
     * @param fieldName Campo per il quale filtrare
     * @param value Valore per il quale filtrare
     * @param operator Operatore per il quale filtrare
     * @returns I parametri per una richiesta relativa agli operatori
     */
    private prepareParams(token: string, fieldName: string, value: string, operator: string): Fetch$Params {
      return {
        "AdesuiteToken": token, 
        "body": {
          "startRow": 0,
          "criteria" : [
            {
              "fieldName": fieldName as "userpin" | "mes_theme_display" | "mes_theme" | "note" | "name" | "ismobileuser" | "numero_matricola" | "isactive" | "foto" | "ad_user_id" | undefined,
              "value": value,
              "operator": operator as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual" | undefined
            }
          ],
          "endRow": 1
        }};
    }

    /**
     * Metodo per appendere l'ultimo numero inserito dall'utente nella casella di testo riservata al pin 
     * @param input Numero da aggiungere alla stringa numerica che rappresenta il pin immesso dall'utente
     */
    public append(input: number): void {
      const previous = this.form.get('pin')?.value;
      this.form.setValue({"pin": previous + input});
    }

    /**
     * Metodo per cancellare il pin inserito, pulendo la casella di testo
     */
    public clear(): void {
      this.form.setValue({"pin": ""});
    }

    /**
     * Metodo per rimuovere l'ultima cifra del pin inserito
     */
    public removeLast(): void {
      const element = (<HTMLInputElement>document.getElementById("pin"));
      this.form.setValue({"pin": element.value.substring(0, element.value.length-1)});
    }

    /**
     * Metodo per ottenere ulteriori informazioni sull'utente autenticato (nome utente, tema predefinito all'avvio)
     */
    private fetchUserInfo(): void {

      const token = this.authInfoService.Token;
      const ad_user_id = this.authInfoService.UserId.toString();

      // Dichiarazioni dettate dai modelli in /app/api/models
      const fieldName = "ad_user_id" as "userpin" | "mes_theme_display" | "mes_theme" | "note" | "name" | "ismobileuser" | "numero_matricola" | "isactive" | "foto" | "ad_user_id" ;
      const operator = "equals" as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual";

    this.loading = true;

    const params = this.prepareParams(token,fieldName,ad_user_id,operator);

    this.operatorsService.fetch(params)
    .subscribe(response => {
      if(response.data != undefined && response.data[0] != undefined && response.data[0].name != undefined && response.data[0].mes_theme != undefined) {
        this.authInfoService.UserName = response.data[0].name.trim();
        this.authInfoService.UserTheme = response.data[0].mes_theme.trim() as "DM" | "WM";
      } else {
        this.openSnackBar("Errore all'ottenimento delle informazioni utente", "X");
      }
    });

    }

    /**
     * Metodo per eseguire il login, consente di salvare l'id utente nel servizio authInfoService e passare così alla visualizzazione di fasi e informazioni di controllo qualità
     * In caso di errore, gestisce l'apertura della barra di stato
     * Gestisce l'apertura della barra di caricamento
     */
  public login(): void {

    if (this.form.invalid) {
      this.openSnackBar("Il pin inserito non è valido!", "X");
      return;
    }

    // Dichiarazioni dati di autenticazione
    const token = this.authInfoService.Token;
    const pin = this.form.controls['pin'].value;

    // Dichiarazioni dettate dai modelli in /app/api/models
    const fieldName = "userpin" as "userpin" | "mes_theme_display" | "mes_theme" | "note" | "name" | "ismobileuser" | "numero_matricola" | "isactive" | "foto" | "ad_user_id" ;
    const operator = "equals" as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual";

    this.loading = true;

    const params = this.prepareParams(token,fieldName,pin,operator);

    this.operatorsService.fetch(params)
    .subscribe({
      next: (response) => {

          if(response.data != undefined && response.data[0] != undefined && response.data[0].ad_user_id != undefined && response.data[0].name != undefined && response.data[0].mes_theme != undefined){
              this.authInfoService.UserId = response.data[0].ad_user_id;
              this.authInfoService.UserName = response.data[0].name.trim();
              this.authInfoService.UserTheme = response.data[0].mes_theme.trim() as "DM" | "WM";
            } 
            else{
              this.openSnackBar("Il PIN inserito non appartiene ad alcun utente", "X")
            };
          this.loading = false;
          if(this.authInfoService.UserId && this.authInfoService.UserName) {
            this.router.navigate(['dashboard']);
          }
      },
      error: response => {
        const errorDescription = (response.error as ErrorModel) != null? (response.error as ErrorModel).description : "Errore lato server";
        this.openSnackBar(("Error " + response.status + " - " + errorDescription), "X");
        this.loading = false;
      }
    });
  }
}
