import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ActiveAttributesService } from 'src/app/services/active-attributes/active-attributes.service';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss']
})
export class LogViewerComponent implements OnInit {

  /**
   * Le colonne da mostrare (la descrizione degli attributi che caratterizzano un controllo qualità per la fase selezionata)
   */
    public displayedColumns: Array<string> = new Array<string>();

  /**
   * Costruttore della classe che gestisce gli attributi relativi a una fase selezionata ed i loro valori
   * @param activeAttributesService Servizio che gestisce gli attributi attualmente attivi
   * @param snackBar Barra di notifica eventi
   * @param translateService Servizio di gestione delle traduzioni: si basa su file json definiti in /assets/
   */
  constructor(private activeAttributesService: ActiveAttributesService, private snackBar: MatSnackBar, private translateService: TranslateService){}

  /**
   * Metodo per ottenere colonne e log salvati per la fase attuale
   */
  ngOnInit(): void {
    this.activeAttributesService.getActiveAttributes()
    .subscribe( attributes => {
      this.displayedColumns = attributes.map((attribute) => attribute.attributename!);

      if(this.displayedColumns.length == 0) {
        this.openSnackBar(this.translateService.instant("Errore: non sono disponibili attributi per la fase selezionata!") ,"X");
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

}
