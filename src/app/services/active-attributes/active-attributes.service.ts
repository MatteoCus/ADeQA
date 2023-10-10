import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { QualityattributeModel, QualityphaseModel } from 'src/app/api/models';
import { ActivePhaseService } from '../active-phase/active-phase.service';
import { AuthInformationsService } from '../auth-informations/auth-informations.service';
import { QualityAttributeService } from 'src/app/api/services';
import { JsonList } from 'src/app/api/models/qualityattribute-model';

@Injectable({
  providedIn: 'root'
})
export class ActiveAttributesService {

  private activeAttributes: Subject<Array<QualityattributeModel>> = new Subject<Array<QualityattributeModel>>();

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

  public update(attributes: Array<QualityattributeModel>): void {
    this.activeAttributes.next(attributes);
  }

  public getActiveAttributes(): Observable<Array<QualityattributeModel>> {
    return this.activeAttributes;
  }



}
