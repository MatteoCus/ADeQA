import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActiveAttributesService } from './active-attributes.service';
import { of } from 'rxjs';
import { QualityAttributeService } from 'src/app/api/services';
import { ActivePhaseService } from '../active-phase/active-phase.service';
import { AuthInformationsService } from '../auth-informations/auth-informations.service';
import { FetchResponseQualityattributeModel, QualityattributeModel, QualityphaseModel } from 'src/app/api/models';

describe('ActiveAttributesService', () => {
  let service: ActiveAttributesService;
  let httpTestingController: HttpTestingController;
  let qualityAttributeService: QualityAttributeService;
  let activePhaseService: ActivePhaseService;
  let authInfoService: AuthInformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ActiveAttributesService);
    httpTestingController = TestBed.inject(HttpTestingController);
    qualityAttributeService = TestBed.inject(QualityAttributeService);
    activePhaseService = TestBed.inject(ActivePhaseService);
    authInfoService = TestBed.inject(AuthInformationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch attributes when the active phase changes', () => {
    const activePhase: QualityphaseModel = { m_product_category_id: 123 };

    spyOn(activePhaseService, 'getActivePhase').and.returnValue(of(activePhase));

    // Make sure the actual HTTP request is not made by preventing the HttpClient call.
    spyOn(qualityAttributeService, 'fetch_3').and.returnValue(of({ data: [] }));

    service.update = jasmine.createSpy('update');

    activePhaseService.getActivePhase().subscribe(() => {
      activePhaseService.update(activePhase);

      expect(qualityAttributeService.fetch_3).toHaveBeenCalledWith(jasmine.objectContaining({
        "AdesuiteToken": "",
        "body": {
          "startRow": 0,
          "criteria": [{
            "fieldName": "m_product_category_id" as "m_product_category_id" | "optionvalue" | "groupname" | "groupdescription" | "c_project_attribute_group_id" | "attributeseqno" | "attributedescription" | "ad_reference_id" | "m_product_id" | "attributevaluetype" | "attributevalue" | "attributename",
            "value": "123",
            "operator": "equals"
          }],
          "endRow": 50
        }
      }));
      expect(service.update).toHaveBeenCalled();
    });
  });

  it('should update attributes', () => {
    const attributes: QualityattributeModel[] = [];
    service.update(attributes);

    service.getActiveAttributes().subscribe((updatedAttributes) => {
      expect(updatedAttributes).toEqual(attributes);
    });
  });

  it('should filter JSON response', () => {
    const response = {
      ad_reference_id: 123123123,
      attributedescription: "descrizione",
      attributename: "nome attributo",
      attributeseqno: 90909090,
      attributevalue: "valore attributo",
      attributevaluetype: "Y" as 'Y' | 'N' | 'S' | 'L',
      c_project_attribute_group_id: 9000000,
      groupdescription: "descrizione gruppo",
      groupname: "nome gruppo",
      m_product_category_id: 9000000,
      m_product_id: 9000000,
      optionvalue: {
        type: "tipo",
        value: "{ \"key\": [\"chiave1\", \"chiave2\"], \"value\": [\"chiave1 - valore 1\", \"chiave2 - valore2\"]}"
      }
    };

    const expected: QualityattributeModel = {
      ad_reference_id: 123123123,
      attributedescription: 'descrizione',
      attributename: 'nome attributo',
      attributeseqno: 90909090,
      attributevalue: 'valore attributo',
      attributevaluetype: 'Y' as 'Y' | 'N' | 'S' | 'L',
      c_project_attribute_group_id: 9000000,
      groupdescription: 'descrizione gruppo',
      groupname: 'nome gruppo',
      m_product_category_id: 9000000,
      m_product_id: 9000000,
      optionvalue: {
        type: 'tipo',
        value: { key: ["chiave1", "chiave2"], value: ["chiave1 - valore 1", "chiave2 - valore2"] }
      }
    };

    expect(service['filterJsonOptions'](response as any as QualityattributeModel)).toEqual(expected);


  });

});
