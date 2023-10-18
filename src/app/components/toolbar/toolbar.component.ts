import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';
import { LogoutService } from 'src/app/services/logout/logout.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { LanguageService } from 'src/app/services/language/language.service';

/**
 * Classe che gestisce l'intestazione della visualizzazione grafica
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  /**
   * Attributo per gestire il toggle dello slider all'avvio
   */
  public isDark: boolean = false;

  /**
   * Attributo contenente la data odierna (giorno in cui il component viene generato)
   * Serve per estrarre nel template HTML il mese, l'anno e la settimana
   */
  public today: Date = new Date();

  /**
   * Attributo contenente il nome dell'utente (operatore) autenticato
   */
  public user: string = "";

  /**
   * Lista di linguaggi disponibili
   */
  public languages: string[] = ["Italiano", "Inglese", "Spagnolo"];

  /**
   * Lista di linguaggi - stringhe da usare con il servizio di traduzione
   */
  public strictLang: string[] = ['it', 'en', 'es'];

  /**
   * Linguaggio attualmente selezionato dalla lista di linguaggi disponibili
   */
  public activeLanguage: string = "";

  /**
 * Query listener: consente di capire quando il menù delle fasi deve cambiare [mode]
 */
  private queryListener: () => void;

  /**
   * Lista di query per capire quando cambiare [mode]
   */
  public mobileQuery: MediaQueryList;

  /**
   * Costruttore della classe che gestisce l'intestazione della visualizzazione grafica 
   * @param authInfoService Servizio per gestire le informazioni relative all'autenticazione
   * @param themeService Servizio di gestione del tema grafico di interfaccia
   * @param logoutService Servizio di gestione logout
   * @param dialog Dialog di logout
   * @param languageService Servizio di gestione del linguaggio attivo nell'applicazione
   */
  constructor(private authInfoService: AuthInformationsService, private themeService: ThemeService, private logoutService: LogoutService, private dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private languageService: LanguageService) {

    this.mobileQuery = media.matchMedia('(max-width: 900px)');
    this.queryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", this.queryListener);

    this.activeLanguage = localStorage.getItem('lang') || 'it';
    this.languageService.changeLanguage(this.activeLanguage);
  }

  /**
   * Metodo di inizializzazione per quanto riguarda nome utente e tema all'avvio
   */
  ngOnInit(): void {
    this.user = this.authInfoService.UserName;
    this.isDark = this.authInfoService.UserTheme == "DM" as "DM" | "WM";
    this.themeService.toggleTheme(this.isDark);
    this.languageService.activeLanguage.subscribe(
      language => {
        this.activeLanguage = language;
      }
    )
  }

  /**
   * Distruttore per rimuovere gli event listener
   */
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("change", this.queryListener);
  }

  /**
   * Metodo per cambiare linguaggio di traduzione dell'applicazione
   * @param language Nuovo linguaggio in cui l'applicazione deve essere tradotta
   */
  public changeActiveLanguage(language: string): void {
    this.languageService.changeLanguage(language);
  }

  /**
   * Metodo per cambiare tema dell'applicazione
   * @param checked Indica se il nuovo tema è scuro o chiaro
   */
  public toggleTheme({ checked }: MatSlideToggleChange): void {
    this.isDark = checked;
    this.themeService.toggleTheme(this.isDark);
  }

  /**
   * Metodo per gestire le interazioni con il dialog di logout generale 
   * Occorre reinserire nome utente e password per ri-ottenere il token
   */
  public openLogoutDialog(): void {
    const logoutDialog = this.dialog.open(LogoutDialogComponent, {
      data: {
        title: 'Logout generale',
        description: 'Occorre reinserire username e pin'
      }
    });

    logoutDialog.afterClosed().subscribe((result) => {
      switch (result.event) {
        case "exit-option":
          this.logoutService.logout();
          break;
        case "stay-option":
          break;
        default:
          break;
      }
    });
  }

  /**
   * Metodo per gestire le interazioni con il dialog di logout parziale 
   * Occorre reinserire il pin per ri-accedere ai servizi in qualità di operatore
   */
  public openLogoutUserDialog(): void {
    const logoutDialog = this.dialog.open(LogoutDialogComponent, {
      data: {
        title: 'Logout parziale',
        description: 'Occorre reinserire il pin'
      }
    });

    logoutDialog.afterClosed().subscribe((result) => {
      switch (result.event) {
        case "exit-option":
          this.logoutService.logoutUserId();
          break;
        case "stay-option":
          break;
        default:
          break;
      }
    });
  }

}
