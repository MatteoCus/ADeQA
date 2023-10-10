import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QualityattributeModel } from 'src/app/api/models';
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
   */
  constructor(private activeAttributesService: ActiveAttributesService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.activeAttributesService.getActiveAttributes()
    .subscribe( attributes => {
      this.displayedColumns = attributes.map((attribute) => attribute.attributename!);

      if(this.displayedColumns.length == 0) {
        this.openSnackBar("Errore: non sono disponibili attributi per la fase selezionata!" ,"X");
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
