import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';

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
   * Costruttore della classe che gestisce la vista principale, reindirizza al login con username in assenza delle informazioni di autenticazione necessarie (token, userId)
   * @param authInfoService Servizio per gestire le informazioni relative all'autenticazione 
   * @param router Router per eseguire dei reindirizzamenti su browser
   */
  constructor(private authInfoService: AuthInformationsService, private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private route: ActivatedRoute) {
    console.log("Entra qui");

    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      if(params && params['inside']){
        console.log(params['inside']);
        if(params['inside'] == "true") {
          this.insideFrame = true;
        }
      } 
    }
  );

  window.addEventListener("message", (event) => {
    console.log("Evento: " + event.data.token);
    if(event.source == parent) {
      // usare event.data per assegnare valore
    }
  });


    if(!this.insideFrame && this.authInfoService.Token == "" || !this.insideFrame && this.authInfoService.UserId as any as number == 0){
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