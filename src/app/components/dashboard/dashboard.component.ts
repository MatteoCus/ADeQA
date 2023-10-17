import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ErrorModel } from 'src/app/api/models';
import { QualityPhaseService } from 'src/app/api/services';
import { ActivePhaseService } from 'src/app/services/active-phase/active-phase.service';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { LogoutService } from 'src/app/services/logout/logout.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

/**
 * Classe che gestisce la visualizzazione principale
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

  /**
   * Query listener: consente di capire quando il menù delle fasi deve cambiare [mode]
   */
  private queryListener: () => void;

  /**
   * Lista di query per capire quando cambiare [mode]
   */
  public tabletQuery: MediaQueryList;

  /**
   * Lista di query per capire quando nascondere la barra laterale
   */
  public mobileQuery: MediaQueryList;

  /**
   * Attributo booleano che indica se l'interfaccia viene visualizzata all'interno di un <iframe>
   */
  private insideFrame: boolean = false;

  /**
   * Costruttore della classe che gestisce la vista principale, reindirizza al login con username in assenza delle informazioni di autenticazione necessarie (token, userId) se non si è all'interno di un <iframe>
   * @param authInfoService Servizio per gestire le informazioni relative all'autenticazione 
   * @param router Router per eseguire dei reindirizzamenti su browser
   */
  constructor(private snackBar: MatSnackBar, private authInfoService: AuthInformationsService, private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private route: ActivatedRoute, 
    private languageService: LanguageService, private activePhaseService: ActivePhaseService, private themeService: ThemeService, private qualityPhaseService: QualityPhaseService,
    private logoutService: LogoutService, private translateService: TranslateService) {
    this.route.queryParams
    .subscribe(params => {
      if(params && params['inside']){
        if(params['inside'] == "true") {
          this.insideFrame = true;
        }
      } 
    }
  );
    if(this.insideFrame) {
      this.addEventListener();
    }

    if(!this.insideFrame && this.authInfoService.Token == "" || !this.insideFrame && this.authInfoService.UserId as any as number == 0){
      this.router.navigate(['login/username']);
    }

    this.mobileQuery = media.matchMedia('(max-width: 900px)');
    this.tabletQuery = media.matchMedia('(max-width: 1200px)');

    this.queryListener = () => changeDetectorRef.detectChanges();
    
    this.mobileQuery.addEventListener("change", this.queryListener);
    this.tabletQuery.addEventListener("change", this.queryListener);
  }

  private addEventListener() {
    window.addEventListener("message", (event) => {
      if (event.source == parent) {
        const data = event.data;

        //0. Verificare che i parametri ci siano tutti
        if (data == undefined || data.token == undefined || data.lang == undefined || data.theme == undefined || data.username == undefined
          || data.m_product_id == undefined || data.c_projectphase_id == undefined || data.user_id == undefined) {
          this.insideFrame = false;
        } else {

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
                 "criteria" : [
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
              (response.data != undefined && response.data != null && response.data.length == 1 && response.data.at(0) != undefined) ? this.activePhaseService.update(response.data.at(0)!) : this.openSnackBar(this.translateService.instant("Errore: non ci sono fasi da visualizzare!") ,"X");
            },
            error: (error) => {
              const errorDescription = (error.error as ErrorModel) != null? (error.error as ErrorModel).description : ( error.status == 401? "Non autorizzato" : "Errore lato server");
              this.openSnackBar(this.translateService.instant("Errore " + error.status + " - " + errorDescription), "X");
              if(error.status == 401){
                this.logoutService.logout();
                this.openSnackBar(this.translateService.instant("Errore 401 - Il token di accesso non è più valido"), "X");
              }
            }});
          

          //4. Aggiornare ThemeService
          this.themeService.toggleTheme(data.theme == "DM");
        }
      }
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
   * Setter per insideFrame
   */
  public set InsideFrame(inside: boolean) { this.insideFrame = inside; }

  /**
   * Getter per insideFrame
   */
  public get InsideFrame() { return this.insideFrame; }

  /**
   * Distruttore per rimuovere gli event listener
   */
  ngOnDestroy(): void {
    this.tabletQuery.removeEventListener("change", this.queryListener);
    this.mobileQuery.removeEventListener("change", this.queryListener);
  }
}