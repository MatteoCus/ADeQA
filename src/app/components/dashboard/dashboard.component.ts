import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';
import { IframeInitializerService } from 'src/app/services/iframe-initializer/iframe-initializer.service';

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
   * Se si è all'interno di un <iframe>, il software viene richiamato con il parametro 'inside=true'
   * @param authInfoService Servizio per gestire le informazioni relative all'autenticazione 
   * @param router Router per eseguire dei reindirizzamenti su browser
   * @param route URL attivo
   * @param iframeInitService Servizio di inizializzazione dei servizi indispensabili per il funzionamento dell'applicazione in un <iframe>
   */
  constructor(private authInfoService: AuthInformationsService, private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private route: ActivatedRoute, private iframeInitService: IframeInitializerService) {
    this.route.queryParams
      .subscribe(params => {
        if (params && params['inside']) {
          if (params['inside'] == "true") {
            this.insideFrame = true;
          }
        }
      }
      );

    // Se siamo dentro a un frame, aggiungo un event listener per acquisire i parametri in ingresso tramite postMessage
    if (this.insideFrame) {
      window.addEventListener("message", (event) => {

        // Accetta i dati in ingresso solo se sono dati dal widget padre
        if (event.source == parent) {
          const data: Message = event.data as Message;

          // Verifico che i parametri ci siano tutti
          if (data == undefined || data.token == undefined || data.lang == undefined || data.theme == undefined || data.username == undefined
            || data.m_product_id == undefined || data.c_projectphase_id == undefined || data.user_id == undefined) {
            this.insideFrame = false;
          } else {
            this.iframeInitService.initialize(data);
          }
        }
      });
    }

    // Se non siamo in un frame e mancano dati (token/id utente), si fa un redirect alle pagine di login
    if (!this.insideFrame && this.authInfoService.Token == "" || !this.insideFrame && this.authInfoService.UserId as any as number == 0) {
      this.router.navigate(['login/username']);
    }

    this.mobileQuery = media.matchMedia('(max-width: 900px)');
    this.tabletQuery = media.matchMedia('(max-width: 1200px)');

    this.queryListener = () => changeDetectorRef.detectChanges();

    this.mobileQuery.addEventListener("change", this.queryListener);
    this.tabletQuery.addEventListener("change", this.queryListener);
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