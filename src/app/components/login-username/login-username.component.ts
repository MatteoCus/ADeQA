import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorModel } from 'src/app/api/models';
import { AuthenticationService } from 'src/app/api/services';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

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
   * Costruttore della classe di login con username e password, evita di renderizzare il form di login qualora vi fosse già un token di autenticazione in localStorage
   * @param formBuilder Variabile atta alla costruzione del form a livello logico
   * @param authService Servizio di autenticazione
   * @param authInfoService Servizio per gestire le informazioni relative all'autenticazione
   * @param snackBar Barra di visualizzazione di messaggi di stato (ex. login fallito)
   * @param router Router per eseguire dei reindirizzamenti su browser
   * @param translateService Servizio di gestione delle traduzioni: si basa su file json definiti in /assets/
   */
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private authInfoService: AuthInformationsService, private snackBar: MatSnackBar, private router: Router, private translateService: TranslateService, private route: ActivatedRoute) { 
    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      if(params && params['inside']){
        console.log(params['inside']);
        if(params['inside'] == "true") {
          console.log("Inside")
        }
      } 
    }
  );
    
    if(localStorage.getItem("ADeToken")!= undefined && localStorage.getItem("ADeToken") != ""){
      this.authInfoService.Token = localStorage.getItem("ADeToken")!;
      this.router.navigate(['login/pin']);
    }
  }

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
     * Gestisce l'apertura della barra di caricamento
     */
  public login(): void {
    if (this.form.invalid) {
      this.openSnackBar(this.translateService.instant("Inserire tutti i dati richiesti"), "X");
      return;
    }

    this.loading = true;

    const params = {
      "body": {
        'password': this.form.controls['password'].value,
        'username': this.form.controls['username'].value
      }};

    this.authService.login(params)
    .subscribe({
      next: (response) => {
          response.token != undefined? this.authInfoService.Token = response.token : this.openSnackBar(this.translateService.instant("Errore 500 - Token nullo"), "X");

          if(this.authInfoService.Token) {
            this.router.navigate(['login/pin']);
          }
      },
      error: response => {
        const errorDescription = (response.error as ErrorModel).description;
        this.openSnackBar(this.translateService.instant("Errore " + response.status + " - " + errorDescription), "X");
        this.loading = false;
      },
      complete: () => { this.loading = false; }
    });
  }
}
