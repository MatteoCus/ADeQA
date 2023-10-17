import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QualityattributeModel } from 'src/app/api/models';
import { ActiveAttributesService } from 'src/app/services/active-attributes/active-attributes.service';
import { ConfirmDataDialogComponent } from '../confirm-data-dialog/confirm-data-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OptionsPipe } from 'src/app/pipes/options.pipe';
import { TranslateService } from '@ngx-translate/core';

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

  /**
   * Attributo booleano per gestire il form da visualizzare
   * Form possibili:
   * -) Form di aggiunta log
   * -) Form di modifica log
   */
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
   * @param dialog Dialog di conferma dei dati inseriti dall'utente
   * @param translateService Servizio di gestione delle traduzioni: si basa su file json definiti in /assets/
   */
  constructor(private activeAttributesService: ActiveAttributesService, private snackBar: MatSnackBar, private dialog: MatDialog, private translateService: TranslateService){}

  /**
   * Metodo che consente di aggiornare la tabella ad ogni cambio degli attributi attivi (avviene quando si aggiorna la fase attiva)
   */
  ngOnInit() {
    this.activeAttributesService.getActiveAttributes()
      .subscribe(attributes => {
        this.activeAttributes = attributes;
        this.displayedColumns = this.activeAttributes.map((attribute) => attribute.attributename!);
        this.initializeForm();
      });
  }

  /**
   * Metodo per inizializzare il form: 
   * Si inseriscono nuovi controlli (togliendo i vecchi)
   * Si assegnano valori di default
   * Si assegnano dei validatori
   */
  private initializeForm(): void {
        this.form = new FormGroup({});

        this.activeAttributes.forEach((value, index) => {
          if (value.attributevaluetype == "Y") {
            this.form.addControl("control-" + index.toString(), new FormControl(false, Validators.required));
          } else {
            this.form.addControl("control-" + index.toString(), new FormControl('', Validators.required));
          }
        });

        if (this.activeAttributes.length == 0) {
          this.openSnackBar(this.translateService.instant("Errore: non sono disponibili attributi per la fase selezionata!"), "X");
        }
  }

  /**
   * Metodo per mostrare a video il dialog di conferma dei dati inseriti per l'aggiunta di un nuovo log
   */
  public addDialog(): void {

    let formData: string[] = [];
    
    this.activeAttributes.forEach((value, index) => {
      let entry : string = value.attributename! + ": ";
    
      if(value.attributevaluetype != "L") {
        entry += this.form.get('control-' + index.toString())?.value;
      } else {
        let position : number = 0;
        position = value.optionvalue?.value.value.findIndex((value) => {
          return this.form.get('control-' + index.toString())?.value == value;
        })!;
        
        entry += new OptionsPipe().transform(this.form.get('control-' + index.toString())?.value, value.optionvalue?.value.key.at(position)!);
      }

      formData.push( entry );
    });

    const addDialog = this.dialog.open(ConfirmDataDialogComponent, {
      data: {
        title:'Aggiungi un log',
        description: 'Dati inseriti:',
        resume: formData
      }
    });

    addDialog.afterClosed().subscribe((result) => {
      switch(result.event) {
        case "confirm-option":
          this.add();
          this.clearDialog();
          break;
        case "cancel-option":
          break;
        default:
          break;
      }
    });
  }

  /**
   * Metodo per mostrare a video il dialog di conferma dei dati inseriti per la modifica di un log
   */
  public updateDialog(): void {
    const updateDialog = this.dialog.open(ConfirmDataDialogComponent, {
      data: {
        title:'Modifica il log selezionato',
        description: 'Dati aggiornati: ' + this.form.value
      }
    });

    updateDialog.afterClosed().subscribe((result) => {
      switch(result.event) {
        case "confirm-option":
          this.update();
          this.clearDialog();
          break;
        case "cancel-option":
          break;
        default:
          break;
      }
    });
  }
  
  /**
   * Metodo per aggiungere un nuovo log relativo alla fase di qualità data
   */
  public add(): void {
    console.info(this.form.value);
  }

  /**
   * Metodo per aggiornare un log relativo alla fase di qualità data
   */
  public update(): void {
    console.log(this.form.value);
    this.addLog = true;
  }

  /**
   * Metodo per ripulire il form dopo il submit dei dati
   */
  public clearDialog(): void {
    this.form.reset();
    this.initializeForm();
  }
}
