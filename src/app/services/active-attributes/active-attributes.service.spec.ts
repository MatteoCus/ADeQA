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
  let qualityAttributeService: QualityAttributeService; // Mock the QualityAttributeService
  let activePhaseService: ActivePhaseService;
  let authInfoService: AuthInformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ActiveAttributesService);
    httpTestingController = TestBed.inject(HttpTestingController);
    qualityAttributeService = TestBed.inject(QualityAttributeService); // Inject the QualityAttributeService
    activePhaseService = TestBed.inject(ActivePhaseService);
    authInfoService = TestBed.inject(AuthInformationsService);

    // Mock the response of activePhaseService
    spyOn(activePhaseService, 'getActivePhase').and.returnValue(of(/* Your mock data for QualityphaseModel */));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch attributes', () => {

    const exampleQualityattributeModel: QualityattributeModel = {
      ad_reference_id: 1,
      attributedescription: 'Attribute Description',
      attributename: 'Attribute Name',
      attributeseqno: 1,
      attributevalue: 'Attribute Value',
      attributevaluetype: 'S',
      c_project_attribute_group_id: 2,
      groupdescription: 'Group Description',
      groupname: 'Group Name',
      m_product_category_id: 3,
      m_product_id: 4,
      optionvalue: {
        type: 'Type',
        value: {
          key: ['Key1', 'Key2'],
          value: ['Value1', 'Value2']
        }
      }
    };
    
    // Create an example object of FetchResponseQualityattributeModel
    const exampleFetchResponse: FetchResponseQualityattributeModel = {
      data: [exampleQualityattributeModel], // An array of QualityattributeModel objects
      endRow: 1,
      startRow: 1,
      totalRows: 1
    };

    // Spy on the method and provide a mock response
    spyOn(qualityAttributeService, 'fetch_3').and.returnValue(of(exampleFetchResponse));

    const exampleQualityphaseModel: QualityphaseModel = {
      ad_client_id: 1,
      ad_org_id: 2,
      c_bpartner_id: 3,
      c_phase_id: 4,
      c_projectline_id: 5,
      c_projectphase_id: 6,
      color: '#FF5733', // Example color
      customer: 'Customer Name',
      end_plan: new Date('2023-12-31'), // Example end date
      isglobal: 'Y',
      linename: 'Line Name',
      m_product_category_id: 7,
      m_product_id: 8,
      phasename: 'Phase Name',
      phasetitlehtml: '<b>Phase Title</b>', // Example HTML content
      projectplan_timeline_id: 9,
      start_plan: new Date('2023-01-01'), // Example start date
      status: 'Y',
    };

    // Trigger the fetchAttributes method
    service['fetchAttributes'](exampleQualityphaseModel);

    // Expect the HTTP request for qualityAttributeService.fetch_3 to have been made
    const req = httpTestingController.expectOne('https://test.adesuite.com/faltracco/rest/openapi/operation/9000003/qualityattribute/fetch');
    expect(req.request.method).toBe('POST'); // Adjust the request method as needed

    // Respond to the request with your mock response data
    req.flush(exampleFetchResponse);

    // Ensure the activeAttributes are updated
    service.getActiveAttributes().subscribe((attributes) => {
      expect(attributes).toEqual([exampleQualityattributeModel]);
    });

    // Verify that there are no outstanding requests
    httpTestingController.verify();
  });
});
