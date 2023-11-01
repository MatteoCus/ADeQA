import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading/loading.service';

/**
 * Componente per la gestione dello splash-screen
 */
@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit {
  /**
   * Attributo che indica la transizione che lo splash-screen deve effettuare
   */
  public splashTransition: string = "";

  /**
   * Opacità di base dello splash-screen all'avvio, in attesa che si completino i caricamenti 
   * dell'interfaccia principale
   */
  public opacityChange: number = 1;

  /**
   * Attributo per nascondere/mostrare lo splash-screen
   */
  public showSplash = true;

  /**
   * Durata della transizione scelta
   */
  @Input() animationDuration: number = 0.5;

  /**
   * Costruttore della classe di gestione dello splash-screen
   * @param loadingService Servizio di tracciamento del caricamento di LogModifierComponent e LogViewerComponent
   */
  constructor(private loadingService: LoadingService){
    this.loadingService.Loading.subscribe( show => {
        if(!show) {
          this.opacityChange = 0;
          setTimeout(() => {
            this.showSplash = false;
          }, this.animationDuration * 1000);
        }
      }
    )
  }

  /**
   * Inizializzazione della transizione
   */
  ngOnInit(): void {
      this.splashTransition = "opacity " + this.animationDuration + "s";
  }
}