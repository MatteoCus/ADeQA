import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { QualityPhaseService } from 'src/app/api/services';
import { ActivePhaseService } from '../active-phase/active-phase.service';
import { LanguageService } from '../language/language.service';
import { LogoutService } from '../logout/logout.service';
import { ThemeService } from '../theme/theme.service';
import { AuthInformationsService } from '../auth-informations/auth-informations.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorModel } from 'src/app/api/models';

/**
 * Classe di gestione dell'inizializzazione dei servizi se il software esegue all'interno di un <iframe>
 */
@Injectable({
  providedIn: 'root'
})
export class IframeInitializerService {

  /**
   * Costruttore della classe relativa all'inizializzazione dei servizi se il software esegue in un <iframe>
   * @param snackBar Barra di notifica eventi
   * @param authInfoService Servizio per gestire le informazioni relative all'autenticazione
   * @param languageService Servizio di gestione del linguaggio attivo nell'applicazione
   * @param activePhaseService Servizio per gestire la fase attiva
   * @param themeService Servizio di gestione del tema grafico di interfaccia
   * @param qualityPhaseService Servizio per l'ottenimento delle fasi
   * @param logoutService Servizio di gestione del logout
   * @param translateService Servizio di gestione delle traduzioni: si basa su file json definiti in /assets/
   */
  constructor(private snackBar: MatSnackBar, private authInfoService: AuthInformationsService, private languageService: LanguageService, private activePhaseService: ActivePhaseService, private themeService: ThemeService, private qualityPhaseService: QualityPhaseService,
    private logoutService: LogoutService, private translateService: TranslateService) { }

  /**
  * Metodo per l'apertura della barra di visualizzazione di messaggi di stato
  * @param message Messaggio da mostrare
  * @param type Etichetta del pulsante di chiusura
  */
  private openSnackBar(message: string, type: string): void {
    this.snackBar.open(message, type, {
      panelClass: ['red-snackbar', 'login-snackbar'],
    });
  }

  /**
   * Metodo per inizializzare i vari servizi in caso di utilizzo del software all'interno di un <iframe>
   * @param data Dati passati dalla pagina che contiene il software all'interno di un <iframe>
   */
  public initialize(data: any): void {

    //1. Aggiornare AuthInfoService
    this.authInfoService.Token = data.token;
    this.authInfoService.UserName = data.username;
    this.authInfoService.UserTheme = data.theme;
    this.authInfoService.UserId = data.user_id;

    //2. Aggiornare LanguageService
    this.languageService.changeLanguage(data.lang);

    //3. Aggiornare ActivePhaseService
    const params = {
      "AdesuiteToken": data.token,
      "body": {
        "startRow": 0,
        "criteria": [
          {
            "fieldName": 'c_projectphase_id' as 'c_phase_id' | 'm_product_category_id' | 'm_product_id' | 'status' | 'projectplan_timeline_id' | 'isglobal' | 'c_projectphase_id' | 'c_bpartner_id' | 'linename' | 'color' | 'start_plan' | 'phasename' | 'end_plan' | 'customer' | 'c_projectline_id' | 'ad_org_id' | 'ad_client_id',
            "value": data.c_projectphase_id,
            "operator": 'equals' as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual" | undefined
          }
        ],
        "endRow": 1
      }
    };
    this.qualityPhaseService.fetch_2(params)
      .subscribe({
        next: (response) => {
          (response.data != undefined && response.data != null && response.data.length == 1 && response.data.at(0) != undefined) ? this.activePhaseService.update(response.data.at(0)!) : this.openSnackBar(this.translateService.instant("Errore: non ci sono fasi da visualizzare!"), "X");
        },
        error: (error) => {
          const errorDescription = (error.error as ErrorModel) != null ? (error.error as ErrorModel).description : (error.status == 401 ? "Non autorizzato" : "Errore lato server");
          this.openSnackBar(this.translateService.instant("Errore " + error.status + " - " + errorDescription), "X");
          if (error.status == 401) {
            this.logoutService.logout();
            this.openSnackBar(this.translateService.instant("Errore 401 - Il token di accesso non è più valido"), "X");
          }
        }
      });

    //4. Aggiornare ThemeService
    this.themeService.toggleTheme(data.theme == "DM");
  }
}
