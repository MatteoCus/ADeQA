import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

/**
 * Classe che gestisce l'intestazione della visualizzazione grafica
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit{
  @ViewChild('languageSelect') select: any; //prova a eliminare e vedere se funziona lo stesso

  /**
   * Attributo per gestire il toggle dello slider all'avvio
   */
  public isDark : boolean = false;

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
   * Linguaggio attualmente selezionato dalla lista di linguaggi disponibili
   */
  public activeLanguage: string = this.languages[0];

  /**
   * Costruttore della classe che gestisce l'intestazione della visualizzazione grafica 
   * @param authInfoService Servizio per gestire le informazioni relative all'autenticazione
   * @param themeService Servizio di gestione del tema grafico di interfaccia
   */
  constructor(private authInfoService: AuthInformationsService, private themeService: ThemeService){
  }

  /**
   * Metodo di inizializzazione per quanto riguarda nome utente e tema all'avvio
   */
  ngOnInit(): void {
    this.user = this.authInfoService.UserName;
    this.isDark = this.authInfoService.UserTheme == "DM" as "DM" | "WM";
    this.themeService.toggleTheme(this.isDark);
  }

  /**
   * Metodo per cambiare linguaggio di traduzione dell'applicazione
   * @param language Nuovo linguaggio in cui l'applicazione deve essere tradotta
   */
  public changeActiveLanguage(language: string) : void {
    this.activeLanguage = language;
    // servirà inserire qui un'istruzione chiamando un servizio di gestione delle traduzioni
  }

  /**
   * Metodo per cambiare tema dell'applicazione
   * @param checked Indica se il nuovo tema è scuro o chiaro
   */
  public toggleTheme({checked}: MatSlideToggleChange): void {
    this.isDark = checked;
    this.themeService.toggleTheme(this.isDark);    
  }

}
