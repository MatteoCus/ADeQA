import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorModel, QualityattributeModel, QualityphaseModel } from 'src/app/api/models';
import { QualityAttributeService, QualitySaveLogService } from 'src/app/api/services';
import { ActivePhaseService } from 'src/app/services/active-phase/active-phase.service';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';

@Component({
  selector: 'app-log-modifier',
  templateUrl: './log-modifier.component.html',
  styleUrls: ['./log-modifier.component.scss']
})
export class LogModifierComponent implements OnInit {

  public activeLog : string [] = [];

  public displayedColumns: string[] = [];

  public loading: boolean = false;

  public activeAttributes: Array<QualityattributeModel> = new Array<QualityattributeModel>();

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

  constructor(private activePhaseService: ActivePhaseService, private qualityAttributeService: QualityAttributeService, private qualitySaveLogService: QualitySaveLogService, private authInfoService: AuthInformationsService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.activePhaseService.getActivePhase().subscribe(activePhase => this.fetchAttributes(activePhase));
  }
  private fetchAttributes(activePhase: QualityphaseModel): void {
    this.loading = true;

    const fieldName = "m_product_category_id" as 'optionvalue' | 'groupname' | 'groupdescription' | 'c_project_attribute_group_id' | 'attributeseqno' | 'attributedescription' | 'ad_reference_id' | 'm_product_category_id' | 'm_product_id' | 'attributevaluetype' | 'attributevalue' | 'attributename'
    const value = activePhase.m_product_category_id;
    const operator = "equals" as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual" | undefined;
    const token = this.authInfoService.Token;

    const params = {
      "AdesuiteToken": token, 
      "body": {
           "startRow": 0,
           "criteria" : [
             {
               "fieldName": fieldName as 'optionvalue' | 'groupname' | 'groupdescription' | 'c_project_attribute_group_id' | 'attributeseqno' | 'attributedescription' | 'ad_reference_id' | 'm_product_category_id' | 'm_product_id' | 'attributevaluetype' | 'attributevalue' | 'attributename',
               "value": value?.toString(),
               "operator": operator as 'iNotContains' | 'iContains' | 'greaterOrEqual' | 'lessOrEqual' | 'equals'
             },
          ],
           "endRow": 50
      }};

    this.qualityAttributeService.fetch_3(params)
    .subscribe({
      next: (response) => {
        (response.data != undefined && response.data != null && response.data.length != 0) ?  this.activeAttributes = response.data  : this.openSnackBar("Non ci sono attributi per questa fase!" ,"X");
      },
      error: (error) => {
        const errorDescription = (error.error as ErrorModel) != null? (error.error as ErrorModel).description : ( error.status == 401? "Non autorizzato" : "Errore lato server");
        this.openSnackBar(("Error " + error.status + " - " + errorDescription), "X");
      },
      complete: () => { this.loading = false; this.displayedColumns = this.activeAttributes.map((attribute) => attribute.attributedescription!) }
    });
  }

}
