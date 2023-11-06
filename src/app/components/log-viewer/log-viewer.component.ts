import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { QualityattributeModel, QualityphaseModel, QualitysavelogModel } from 'src/app/api/models';
import { QualitySaveLogService } from 'src/app/api/services';
import { ActiveAttributesService } from 'src/app/services/active-attributes/active-attributes.service';
import { ActivePhaseService } from 'src/app/services/active-phase/active-phase.service';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { MainViewCommunicationsService } from 'src/app/services/main-view-communications/main-view-communications.service';
import { ConfirmDataDialogComponent } from '../confirm-data-dialog/confirm-data-dialog.component';

/**
 * Classe di visualizzazione dei log inseriti
 */
@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss']
})
export class LogViewerComponent implements OnInit {

  private lastPhase: QualityphaseModel = new Object();

  private activeLogs: QualitysavelogModel[] = [];

  public logs: Subject<any[]> = new Subject<any[]>();

  public highlighted: QualitysavelogModel = new Object();

  public blinkLogId: number = 0;

  /**
   * Le colonne da mostrare (la descrizione degli attributi che caratterizzano un controllo qualità per la fase selezionata)
   */
  public displayedColumns: Array<string> = new Array<string>();

  public attributes: QualityattributeModel[] = [];

  /**
   * Costruttore della classe che gestisce gli attributi relativi a una fase selezionata ed i loro valori
   * @param activeAttributesService Servizio che gestisce gli attributi attualmente attivi
   * @param snackBar Barra di notifica eventi
   * @param translateService Servizio di gestione delle traduzioni: si basa su file json definiti in /assets/
   * @param loadingService Servizio di tracciamento del caricamento di LogModifierComponent e LogViewerComponent
   */
  constructor(private activeAttributesService: ActiveAttributesService, private snackBar: MatSnackBar, private translateService: TranslateService, private loadingService: LoadingService,
    private activePhaseService: ActivePhaseService, private qualitySaveLogService: QualitySaveLogService, private authInfoService: AuthInformationsService,
    private mainViewCommunicationsService: MainViewCommunicationsService, private dialog: MatDialog) {

    this.activePhaseService.getActivePhase().subscribe(phase => {
      this.lastPhase = phase;
      this.updateTable(phase);
      this.loadingService.stopViewerLoading();
    });

  }

  /**
   * Metodo per ottenere colonne e log salvati per la fase attuale, indica quando il caricamento è terminato (per far sparire lo splash-screen)
   */
  ngOnInit(): void {

    this.activeAttributesService.getActiveAttributes()
      .subscribe(attributes => {
        this.displayedColumns = attributes.map((attribute) => attribute.attributevalue!);
        this.attributes = attributes.slice();
        this.attributes.push({ attributename: 'Azioni', attributevalue: 'Actions' });

        if (this.displayedColumns.length == 0) {
          this.openFailSnackBar("Errore: non sono disponibili attributi per la fase selezionata!", "X");
        }
        else if (this.displayedColumns.findIndex(value => value == 'Actions') == -1) {
          this.displayedColumns.push("Actions");
        }
      });

    this.mainViewCommunicationsService.viewUpdate.subscribe((updatedLog) => {
      this.highlighted = {};
      this.updateTable(this.lastPhase);
      this.blinkLogId = updatedLog.c_projectphase_quality_log_id!;

      // Rimuove dopo 5 secondi la classe 'blink' (evita che ad ogni cambio di tema l'ultima fase aggiunta / modificata venga evidenziata)
      setTimeout(() => {
        this.blinkLogId = 0;
      }, 5500);
    });
  }

  private updateTable(phase: QualityphaseModel) {

    const token = this.authInfoService.Token;

    const params = {
      "AdesuiteToken": token,
      "body": {
        "startRow": 0,
        "criteria": [
          {
            "fieldName": "c_projectphase_id" as "qualitystatus" | "qualityvalue" | "isactive" | "c_projectphase_quality_log_id" | "c_projectphase_id" | undefined,
            "value": phase.c_projectphase_id?.toString(),
            "operator": "equals" as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual" | undefined
          }
        ],
        "endRow": 100
      }
    };

    this.qualitySaveLogService.fetch_1(params).subscribe({
      next: (response) => {

        let logs: any[] = [];
        this.activeLogs = response.data!;
        response.data?.forEach((log) => {

          const actualQualityValue: { type: string; value: string; } = log.qualityvalue! as any;
          let aux = JSON.parse(actualQualityValue.value);
          aux.Actions = "";
          aux.c_projectphase_quality_log_id = log.c_projectphase_quality_log_id;
          logs.push(aux);
        });

        logs.sort((firstLog, secondLog) => { return secondLog.c_projectphase_quality_log_id - firstLog.c_projectphase_quality_log_id })

        this.logs.next(logs);
      },
      error: (error) => {
        this.openFailSnackBar("Errore " + error.status + " - " + error.error.description, "X");
      }
    });

  }

  /**
   * Metodo per l'apertura della barra di visualizzazione di messaggi di stato
   * @param message Messaggio da mostrare
   * @param type Etichetta del pulsante di chiusura
  */
  private openFailSnackBar(message: string, type: string): void {
    this.snackBar.open(this.translateService.instant(message), type, {
      panelClass: ['red-snackbar'],
    });
  }
  private openSuccessSnackBar(message: string, type: string): void {
    this.snackBar.open(this.translateService.instant(message), type, {
      panelClass: ['green-snackbar'],
    });
  }

  public highlight(selected: QualitysavelogModel): void {
    this.highlighted = selected;
    this.blinkLogId = 0;
  }

  public edit(selectedLog: any): void {
    const logToUpdate = this.activeLogs.find((log) => log.c_projectphase_quality_log_id == selectedLog.c_projectphase_quality_log_id);
    if (logToUpdate != undefined) {
      this.mainViewCommunicationsService.updateLog.next(logToUpdate);
    }
  }

  public deleteDialog(selectedLog: any): void {
    const tableAttributes = this.attributes.slice().map(attribute => attribute.attributename).filter(attribute => attribute != "Azioni");
    const tableColumns = this.displayedColumns.filter(column => column != "Actions");

    let formData: string[] = [];

    // PRECONDIZIONE: tableColumns e tableAttributes hanno lo stesso numero di elementi
    tableAttributes.forEach((attribute, index) => {
      let booleanTranslated: string = selectedLog[tableColumns.at(index)!];

      if (booleanTranslated == "true" || booleanTranslated == "false") {
        booleanTranslated = this.translateService.instant(booleanTranslated);
      }
      const entry: string = attribute + ": " + booleanTranslated;
      formData.push(entry);
    });



    const deleteDialog = this.dialog.open(ConfirmDataDialogComponent, {
      data: {
        title: this.translateService.instant('Eliminazione'),
        description: this.translateService.instant('Vuoi eliminare il seguente log?'),
        resume: formData
      }
    });

    deleteDialog.afterClosed().subscribe((result) => {
      switch (result.event) {
        case "confirm-option":
          this.delete(selectedLog);
          break;
        case "cancel-option":
          break;
        default:
          break;
      }
    });
  }

  public delete(selectedLog: any): void {
    const token = this.authInfoService.Token;

    const params = {
      "AdesuiteToken": token,
      "body": {
        "c_projectphase_quality_log_id": selectedLog.c_projectphase_quality_log_id
      }
    }

    this.qualitySaveLogService.Delete(params).subscribe({
      next: (log) => {
        this.openSuccessSnackBar("Eliminazione avvenuta correttamente!", "X")
        this.mainViewCommunicationsService.viewUpdate.next(log);
      },
      error: (error) => {
        this.openFailSnackBar("Errore " + error.status + " - " + error.error.description, "X");
      }
    })
  }

}
