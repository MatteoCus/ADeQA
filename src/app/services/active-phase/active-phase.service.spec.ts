import { TestBed } from '@angular/core/testing';

import { ActivePhaseService } from './active-phase.service';
import { QualityphaseModel } from 'src/app/api/models';

describe('ActivePhaseService', () => {
  let service: ActivePhaseService;
  let phase: QualityphaseModel = {
    ad_client_id: 1,
    ad_org_id: 2,
    c_bpartner_id: 3,
    c_phase_id: 4,
    c_projectline_id: 5,
    c_projectphase_id: 6,
    color: 'FF5733',
    customer: 'Example Customer',
    end_plan: new Date('2023-12-31'),
    isglobal: 'Y',
    linename: 'Example Line Name',
    m_product_category_id: 7,
    m_product_id: 8,
    phasename: 'Example Phase Name',
    phasetitlehtml: '<p>Example Phase Title</p>',
    projectplan_timeline_id: 9,
    start_plan: new Date('2023-01-01'),
    status: 'Y'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivePhaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the active phase', () => {
    service.update(phase);

    service.getActivePhase().subscribe((value) => {
      expect(value).toBe(phase);
    });
  });

  it('should not emit if the phase is the same', () => {
    const spy = spyOn(service['activePhase'], 'next');

    service.update(phase);
    service.update(phase);

    expect(spy).toHaveBeenCalledTimes(1); // Should only be called once
  });
});
