import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorModel, QualityattributeModel, QualityphaseModel } from 'src/app/api/models';
import { JsonList } from 'src/app/api/models/qualityattribute-model';
import { QualityAttributeService, QualitySaveLogService } from 'src/app/api/services';
import { ActivePhaseService } from 'src/app/services/active-phase/active-phase.service';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';

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
   * Attributo booleano per gestire lo "skeleton loading"
   */
  public loading: boolean = false;

  /**
   * Gli attributi che caratterizzano un controllo qualità per la fase selezionata
   */
  public activeAttributes: Array<QualityattributeModel> = new Array<QualityattributeModel>();

  /**
   * Form di gestione dell'aggiunta/modifica di un log di qualità per la fase selezionata
   */
  public form: FormGroup = new FormGroup({});

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
   * @param activePhaseService Servizio che gestisce la fase attualmente selezionata
   * @param qualityAttributeService Servizio per ottenere gli attributi per la fase selezionata
   * @param qualitySaveLogService Servizio per eseguire operazioni CRUD relativamente a log di controllo qualità
   * @param authInfoService Servizio di gestione delle informazioni di autenticazione utente
   * @param snackBar Barra di notifica eventi
   */
  constructor(private activePhaseService: ActivePhaseService, private qualityAttributeService: QualityAttributeService, private qualitySaveLogService: QualitySaveLogService, private authInfoService: AuthInformationsService, private snackBar: MatSnackBar){}

  /**
   * Sottoscrizione allo stream delle fasi selezionate
   */
  ngOnInit(): void {
    this.activePhaseService.getActivePhase().subscribe(activePhase => this.fetchAttributes(activePhase));
  }

  /**
   * Metodo per ottenere gli attributi relativi alla fase attualmente attiva
   * @param activePhase Fase attualmente attiva
   */
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
        (response.data != undefined && response.data != null && response.data.length != 0) ?  this.activeAttributes = response.data.map<QualityattributeModel>((attribute) => {return this.filterJsonOptions(attribute)})  : this.openSnackBar("Non ci sono attributi per questa fase!" ,"X");
        this.displayedColumns = this.activeAttributes.map((attribute) => attribute.attributename!);

        this.form = new FormGroup({});

        this.activeAttributes.forEach((value,index) => {
          if(value.attributevaluetype == "Y") {
            this.form.addControl("control-" + index.toString(), new FormControl(false, Validators.required));
          } else {
            this.form.addControl("control-" + index.toString(), new FormControl('', Validators.required));
          }
        });
      },
      error: (error) => {
        const errorDescription = (error.error as ErrorModel) != null? (error.error as ErrorModel).description : ( error.status == 401? "Non autorizzato" : "Errore lato server");
        this.openSnackBar(("Error " + error.status + " - " + errorDescription), "X");
      },
      complete: () => { this.loading = false }
    });
  }

  /**
   * Metodo per ottenere le opzioni per un attributo di tipo "lista"
   * @param attribute Attributo per il quale individuare le varie opzioni di selezione (presenti come stringhe negli array 'key' e 'value' all'avvio)
   * @returns L'attributo in ingresso al quale le opzioni sono state modellate
   */
  private filterJsonOptions(attribute: QualityattributeModel): QualityattributeModel {
    let json = attribute.optionvalue?.value.toString();
    let dataList: JsonList = {
      key: [],
      value: []
    };
    if(json != undefined) {
      const parsedJson = JSON.parse(json);
      const filteredValue = this.removeKeys(parsedJson.value, parsedJson.key);
      dataList = {
          key: parsedJson.key,
          value: filteredValue,
        };
    }

    return {
      ad_reference_id: attribute.ad_reference_id,
      attributedescription: attribute.attributedescription,
      attributename: attribute.attributename,
      attributeseqno: attribute.attributeseqno,
      attributevalue: attribute.attributevalue,
      attributevaluetype: attribute.attributevaluetype,
      c_project_attribute_group_id: attribute.c_project_attribute_group_id,
      groupdescription: attribute.groupdescription,
      groupname: attribute.groupname,
      m_product_category_id: attribute.m_product_category_id,
      m_product_id: attribute.m_product_id,
      optionvalue: {
        type: attribute.optionvalue?.type!,
        value: dataList
      }
    }
  
  }

  /**
   * Metodo per rimuovere le chiavi presenti nelle stringhe salvate nell'array 'values'
   * @param values Array di stringhe contenente i valori delle varie opzioni da mostrare a video
   * @param keys Array di stringhe contenente le chiavi identificative dei valori delle opzioni da mostrare a video
   * @returns L'array values senza le chiavi
   */
  private removeKeys(values: string[], keys: string[]): string[] {
    let array : string[] = [];
    if(values != null && values.length) {
      values.forEach((value,index) => {
        const newValue = value.replaceAll(keys[index],"").replaceAll("-","").trim();
        array.push(newValue);
      }, array);
    }
    return array;
  }

  onSubmit() {
    console.info(this.form.value);
  }
}
