import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QualityattributeModel, QualityphaseModel, QualitysavelogModel } from 'src/app/api/models';
import { ActiveAttributesService } from 'src/app/services/active-attributes/active-attributes.service';
import { ConfirmDataDialogComponent } from '../confirm-data-dialog/confirm-data-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OptionsPipe } from 'src/app/pipes/options.pipe';
import { TranslateService } from '@ngx-translate/core';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { QualitySaveLogService } from 'src/app/api/services';
import { Add$Params } from 'src/app/api/fn/quality-save-log/9000004-add';
import { ActivePhaseService } from 'src/app/services/active-phase/active-phase.service';
import { Update$Params } from 'src/app/api/fn/quality-save-log/9000004-update';
import { MainViewCommunicationsService } from 'src/app/services/main-view-communications/main-view-communications.service';

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
   * Fase attiva, serve per preparare i parametri per le richieste HTTP
   */
  private activePhase: QualityphaseModel = new Object();

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
   * Attributo che contiene i dati del log da modificare
   */
  public updateDataSource: any[] = [];

  /**
   * Attributo booleano per gestire il form da visualizzare
   * Form possibili:
   * -) Form di aggiunta log: true
   * -) Form di modifica log: false
   */
  public addLog: boolean = true;

  /**
   * Attributo che indica le opzioni selezionate per gli attributi di tipo "lista" in un log da modificare
   */
  public defaultOption: string[] = [];

  /**
   * Log di qualità da modificare
   */
  private logToUpdate: QualitysavelogModel = new Object();

  /**
   * Metodo per l'apertura della barra di visualizzazione di messaggi di stato in caso di fallimento
   * @param message Messaggio da mostrare
   * @param type Etichetta del pulsante di chiusura
  */
  private openFailSnackBar(message: string, type: string): void {
    this.snackBar.open(message, type, {
      panelClass: ['red-snackbar'],
    });
  }

  /**
   * Metodo per l'apertura della barra di visualizzazione di messaggi di stato in caso di successo
   * @param message Messaggio da mostrare
   * @param type Etichetta del pulsante di chiusura
  */
  private openSuccessSnackBar(message: string, type: string): void {
    this.snackBar.open(message, type, {
      panelClass: ['green-snackbar'],
    });
  }

  /**
   * Costruttore della classe che gestisce gli attributi relativi a una fase selezionata ed i loro valori
   * @param activeAttributesService Servizio che gestisce gli attributi attualmente attivi
   * @param snackBar Barra di notifica eventi
   * @param dialog Dialog di conferma dei dati inseriti dall'utente
   * @param translateService Servizio di gestione delle traduzioni: si basa su file json definiti in /assets/
   * @param authInfoService Servizio per gestire le informazioni relative all'autenticazione
   * @param loadingService Servizio di tracciamento del caricamento di LogModifierComponent e LogViewerComponent
   * @param qualitySaveLogService Servizio per aggiungere / modificare / eliminare i log di qualità
   * @param activePhaseService Servizio per gestire la fase attiva
   * @param mainViewCommunicationsService Servizio che mette in comunicazione LogModifierComponent e LogViewerComponent
   */
  constructor(private activeAttributesService: ActiveAttributesService, private snackBar: MatSnackBar, private dialog: MatDialog, private translateService: TranslateService,
    private authInfoService: AuthInformationsService, private loadingService: LoadingService, private qualitySaveLogService: QualitySaveLogService, private activePhaseService: ActivePhaseService,
    private mainViewCommunicationsService: MainViewCommunicationsService) { }

  /**
   * Metodo che consente di aggiornare la tabella ad ogni cambio degli attributi attivi (avviene quando si aggiorna la fase attiva)
   */
  ngOnInit() {

    this.activePhaseService.getActivePhase().subscribe(phase => {
      this.activePhase = phase;
    });

    this.mainViewCommunicationsService.viewUpdate.subscribe(() => this.clearDialog())

    this.mainViewCommunicationsService.updateLog.subscribe((toUpdateLog) => {
      this.logToUpdate = toUpdateLog;
      this.updateDataSource = [];

      const actualQualityValue: { type: string; value: string; } = toUpdateLog.qualityvalue! as any;
      const json = JSON.parse(actualQualityValue.value);
      this.form = new FormGroup({});

      this.activeAttributes.forEach(value => {
        this.defaultOption = [];
        if (value.attributevaluetype == "L") {
          json[value.attributevalue!] = (json[value.attributevalue!.toString() + '_id' as any] + " - " + json[value.attributevalue! as any]);
          this.defaultOption.push(json[value.attributevalue!]);
        } else {
          this.defaultOption.push("");
        }

        if (value.attributevaluetype == "Y") {
          json[value.attributevalue!] = json[value.attributevalue!] == "true";
        }
      });

      this.updateDataSource.push(json);

      this.activeAttributes.forEach((value, index) => {

        const formValue: any = this.updateDataSource.at(0)[value.attributevalue!];
        if (value.attributevaluetype != undefined) {
          this.form.addControl("control-" + index.toString(), new FormControl(formValue, Validators.required));
        }
      });


      this.addLog = false;
    })

    this.activeAttributesService.getActiveAttributes()
      .subscribe(attributes => {
        this.addLog = true;
        this.activeAttributes = attributes.slice();
        this.displayedColumns = this.activeAttributes.map((attribute) => attribute.attributevalue!);
        this.initializeForm();
        this.loadingService.stopModifierLoading();
      });
  }

  /**
   * Metodo per la preparazione dei parametri per la richiesta di aggiunta di un log di qualità per la fase attiva
   * @param token Token di autenticazione
   * @param c_projectphase_id Identificativo della fase attiva
   * @param qualityvalue Valore del log, è una stringa in formato JSON
   * @returns Parametri per la richiesta di aggiunta di un log di qualità per la fase attiva
   */
  private prepareAddParams(token: string, c_projectphase_id: number, qualityvalue: string): Add$Params {
    return {
      "AdesuiteToken": token,
      "body": {
        "c_projectphase_id": c_projectphase_id,
        "qualityvalue": qualityvalue
      }
    };
  }

  /**
   * Metodo per la preparazione dei parametri per la richiesta di modifica di un log di qualità per la fase attiva
   * @param token Token di autenticazione
   * @param c_projectphase_quality_log_id Identificativo del log da modificare
   * @param qualityvalue Valore del log, è una stringa in formato JSON
   * @returns Parametri per la richiesta di modifica di un log di qualità per la fase attiva
   */
  private prepareUpdateParams(token: string, c_projectphase_quality_log_id: number, qualityvalue: string): Update$Params {
    return {
      "AdesuiteToken": token,
      "body": {
        "c_projectphase_quality_log_id": c_projectphase_quality_log_id,
        "qualityvalue": qualityvalue
      }
    };
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
      if (value.attributevaluetype == 'Y') {
        this.form.addControl("control-" + index.toString(), new FormControl(false, Validators.required));
      } else {
        this.form.addControl("control-" + index.toString(), new FormControl('', Validators.required));
      }
    });

    if (this.activeAttributes.length == 0) {
      this.openFailSnackBar(this.translateService.instant("Errore: non sono disponibili attributi per la fase selezionata!"), "X");
    }
  }

  /**
   * Metodo per mostrare a video il dialog di conferma dei dati inseriti per l'aggiunta di un nuovo log
   */
  public addDialog(): void {

    let formData: string[] = [];

    this.activeAttributes.forEach((value, index) => {
      let entry: string = value.attributename! + ": ";

      if (value.attributevaluetype != "L") {
        entry += this.form.get('control-' + index.toString())?.value;
      } else {
        let position: number = 0;
        position = value.optionvalue?.value.value.findIndex((value) => {
          return this.form.get('control-' + index.toString())?.value == value;
        })!;

        entry += new OptionsPipe().transform(this.form.get('control-' + index.toString())?.value, value.optionvalue?.value.key.at(position)!);
      }

      formData.push(entry);
    });

    const addDialog = this.dialog.open(ConfirmDataDialogComponent, {
      data: {
        title: this.translateService.instant('Aggiungi un log'),
        description: this.translateService.instant('Dati inseriti:'),
        resume: formData
      }
    });

    addDialog.afterClosed().subscribe((result) => {
      switch (result.event) {
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
    let formData: string[] = [];

    this.activeAttributes.forEach((value, index) => {
      let entry: string = value.attributename! + ": ";

      if (value.attributevaluetype != "L") {
        entry += this.form.get('control-' + index.toString())?.value;
      } else {
        let position: number = 0;
        position = value.optionvalue?.value.value.findIndex((value) => {
          return this.form.get('control-' + index.toString())?.value == value;
        })!;

        entry += new OptionsPipe().transform(this.form.get('control-' + index.toString())?.value, value.optionvalue?.value.key.at(position)!);
      }

      formData.push(entry);
    });

    const updateDialog = this.dialog.open(ConfirmDataDialogComponent, {
      data: {
        title: this.translateService.instant('Modifica il log selezionato'),
        description: this.translateService.instant('Dati aggiornati:'),
        resume: formData
      }
    });

    updateDialog.afterClosed().subscribe((result) => {
      switch (result.event) {
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

  /**
   * Metodo per aggiungere un nuovo log relativo alla fase di qualità attiva
   */
  public add(): void {

    const token: string = this.authInfoService.Token;
    const qualityvalue: string = this.buildQualityValue();

    const params = this.prepareAddParams(token, this.activePhase.c_projectphase_id!, qualityvalue)

    this.qualitySaveLogService.Add(params).subscribe({
      next: (log) => {
        this.openSuccessSnackBar(this.translateService.instant("Inserimento avvenuto correttamente!"), "X");
        this.mainViewCommunicationsService.viewUpdate.next(log);
      },
      error: (error) => this.openFailSnackBar("Errore " + error.status + " - " + error.error.description, "X")
    })
  }

  /**
   * Metodo per costruire una stringa in formato JSON contenente i valori del form
   * Serve per costruire il parametro "qualityvalue" per l'aggiunta / la modifica di un log di qualità
   * @returns Una stringa contenente il parametro "qualityvalue"
   */
  private buildQualityValue(): string {
    let qualityvalue: string = "{";

    // modificare qui
    const removeIndex = this.activeAttributes.findIndex(attribute => { return attribute.attributevalue == "Actions" });
    if (removeIndex != -1) {
      this.activeAttributes = this.activeAttributes.splice(removeIndex, 1);
    }
    this.activeAttributes.forEach((value, i) => {
      qualityvalue += "\"";
      qualityvalue += this.activeAttributes.at(i)?.attributevalue;
      qualityvalue += "\": \"";

      if (value.attributevaluetype == "L") {
        let position: number = 0;
        position = value.optionvalue?.value.value.findIndex((value) => {
          return this.form.get('control-' + i.toString())?.value == value;
        })!;
        qualityvalue += new OptionsPipe().transform(this.form.get('control-' + i.toString())?.value, value.optionvalue?.value.key.at(position)!);
        qualityvalue += "\", \"" + value.attributevalue + "_id\": \"" + value.optionvalue?.value.key.at(position);
      } else {
        qualityvalue += this.form.value['control-' + i];
      }
      qualityvalue += "\"";
      if (i != this.activeAttributes.length - 1) {
        qualityvalue += ", ";
      }
    });
    qualityvalue += "}";
    return qualityvalue;
  }

  /**
   * Metodo per aggiornare un log relativo alla fase di qualità attiva
   */
  public update(): void {

    const token: string = this.authInfoService.Token;
    const qualityValue = this.buildQualityValue();

    const params = this.prepareUpdateParams(token, this.logToUpdate.c_projectphase_quality_log_id!, qualityValue);

    this.qualitySaveLogService.Update(params).subscribe({
      next: (log) => {
        this.openSuccessSnackBar(this.translateService.instant("Aggiornamento avvenuto correttamente!"), "X")
        this.mainViewCommunicationsService.viewUpdate.next(log);
      },
      error: (error) => this.openFailSnackBar("Errore " + error.status + " - " + error.error.description, "X")
    });

  }

  /**
   * Metodo per ripulire il form dopo il submit dei dati
   */
  public clearDialog(formDirective?: FormGroupDirective): void {
    this.form.reset();
    this.initializeForm();
    if (formDirective != undefined) {
      formDirective.resetForm();
    }
    this.addLog = true;
  }
}
