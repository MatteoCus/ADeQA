import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QualityattributeModel } from 'src/app/api/models';
import { ActiveAttributesService } from 'src/app/services/active-attributes/active-attributes.service';
import { ConfirmDataDialogComponent } from '../confirm-data-dialog/confirm-data-dialog.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Classe che gestisce gli attributi relativi a una determinata fase selezionata ed i loro valori
 */
@Component({
  selector: 'app-log-modifier',
  templateUrl: './log-modifier.component.html',
  styleUrls: ['./log-modifier.component.scss']
})
export class LogModifierComponent implements OnInit {

  /**
   * Le colonne da mostrare (la descrizione degli attributi che caratterizzano un controllo qualità per la fase selezionata)
   */
  public displayedColumns: Array<string> = new Array<string>();

  /**
   * Gli attributi che caratterizzano un controllo qualità per la fase selezionata
   */
  public activeAttributes: Array<QualityattributeModel> = new Array<QualityattributeModel>();

  /**
   * Form di gestione dell'aggiunta/modifica di un log di qualità per la fase selezionata
   */
  public form: FormGroup = new FormGroup({});

  public addLog: boolean = true;

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
   * Costruttore della classe che gestisce gli attributi relativi a una fase selezionata ed i loro valori
   * @param activeAttributesService Servizio che gestisce gli attributi attualmente attivi
   * @param snackBar Barra di notifica eventi
   */
  constructor(private activeAttributesService: ActiveAttributesService, private snackBar: MatSnackBar, private dialog: MatDialog){}

  /**
   * Metodo che consente di aggiornare la tabella ad ogni cambio degli attributi attivi (avviene quando si aggiorna la fase attiva)
   */
  ngOnInit() {
    this.activeAttributesService.getActiveAttributes()
    .subscribe( attributes => {
      this.activeAttributes = attributes;
      this.displayedColumns = this.activeAttributes.map((attribute) => attribute.attributename!);
      this.form = new FormGroup({});

      this.activeAttributes.forEach((value,index) => {
        if(value.attributevaluetype == "Y") {
          this.form.addControl("control-" + index.toString(), new FormControl(false, Validators.required));
        } else {
          this.form.addControl("control-" + index.toString(), new FormControl('', Validators.required));
        }
      });

      if(this.activeAttributes.length == 0) {
        this.openSnackBar("Errore: non sono disponibili attributi per la fase selezionata!" ,"X");
      }
    });
  }

  public addDialog(): void {

    let formDescription: string = "";
    
    this.displayedColumns.forEach((value, index) => {
      formDescription += "\n";
      formDescription += value + ": ";
      formDescription += this.form.get('control-' + index.toString())?.value ;
    });

    const logoutDialog = this.dialog.open(ConfirmDataDialogComponent, {
      data: {
        title:'Aggiungi un log',
        description: 'Dati inseriti:' + formDescription
      }
    });

    logoutDialog.afterClosed().subscribe((result) => {
      switch(result.event) {
        case "confirm-option":
          this.add();
          break;
        case "cancel-option":
          break;
        default:
          break;
      }
    });
  }

  public updateDialog(): void {
    const logoutDialog = this.dialog.open(ConfirmDataDialogComponent, {
      data: {
        title:'Modifica il log selezionato',
        description: 'Dati aggiornati: ' + this.form.value
      }
    });

    logoutDialog.afterClosed().subscribe((result) => {
      switch(result.event) {
        case "confirm-option":
          this.update();
          break;
        case "cancel-option":
          break;
        default:
          break;
      }
    });
  }
  
  // Metodi: uno per update ed uno per add, ognuno di essi è subordinato a una variabile booleana che fa vedere (o meno) i relativi pulsanti

  private add(): void {
    console.info(this.form.value);
  }

  private update(): void {
    console.log(this.form.value);
    this.addLog = true;
  }
}
