import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { QualityattributeModel, QualityphaseModel } from 'src/app/api/models';
import { ActivePhaseService } from '../active-phase/active-phase.service';
import { AuthInformationsService } from '../auth-informations/auth-informations.service';
import { QualityAttributeService } from 'src/app/api/services';
import { JsonList } from 'src/app/api/models/qualityattribute-model';

/**
 * Classe che gestisce gli attributi attivi
 * Ad ogni cambio di fase, aggiorna gli attributi
 */
@Injectable({
  providedIn: 'root'
})
export class ActiveAttributesService {

  /**
   * Subject che emette gli attributi attivi dopo ogni cambio di fase attiva
   */
  private activeAttributes: Subject<Array<QualityattributeModel>> = new Subject<Array<QualityattributeModel>>();

  /**
   * Costruttore della classe che gestisce gli attributi attivi
   * @param qualityAttributeService Servizio per l'ottenimento degli attributi attivi
   * @param authInfoService Servizio per gestire le informazioni relative all'autenticazione 
   * @param activePhaseService Servizio per gestire la fase attiva
   */
  constructor(private qualityAttributeService: QualityAttributeService, private authInfoService: AuthInformationsService, private activePhaseService: ActivePhaseService) {
    this.activePhaseService.getActivePhase().subscribe(activePhase => {this.fetchAttributes(activePhase)});
   }

    /**
   * Metodo per ottenere gli attributi relativi alla fase attualmente attiva
   * @param activePhase Fase attualmente attiva
   */
    private fetchAttributes(activePhase: QualityphaseModel): void {
  
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
      .subscribe( (response) => {
          this.update(response.data!.map<QualityattributeModel>((attribute) => {return this.filterJsonOptions(attribute)}));
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
      dataList = {
          key: parsedJson.key,
          value: parsedJson.value,
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
   * Metodo per aggiornare gli attributi attivi
   * @param attributes Nuovi attributi attivi
   */
  public update(attributes: Array<QualityattributeModel>): void {
    this.activeAttributes.next(attributes);
  }
  
  /**
   * Metodo per ottenere un oggetto osservabile degli attributi attivi
   * @returns Oggetto osservabile, serve per eseguire codice al cambiamento degli attributi attivi
   */
  public getActiveAttributes(): Observable<Array<QualityattributeModel>> {
    return this.activeAttributes;
  }

}
