import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let loadingService: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    loadingService = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(loadingService).toBeTruthy();
  });

  it('should initially have both logModifierLoading and logViewerLoading as true', () => {
    expect(loadingService['logModifierLoading']).toBeTrue();
    expect(loadingService['logViewerLoading']).toBeTrue();
  });

  it('should have a loading observable', () => {
    expect(loadingService.Loading).toBeDefined();
  });

  it('should stop modifier loading and notify when both loading flags are false', (done) => {
    const loadingObservable = loadingService.Loading;

    loadingObservable.subscribe((value) => {
      expect(value).toBeFalse();
      done();
    });

    loadingService.stopModifierLoading();
    loadingService.stopViewerLoading();
  });

  it('should stop viewer loading and notify when both loading flags are false', (done) => {
    const loadingObservable = loadingService.Loading;

    loadingObservable.subscribe((value) => {
      expect(value).toBeFalse();
      done();
    });

    loadingService.stopViewerLoading();
    loadingService.stopModifierLoading();
  });

  it('should not notify when only modifier loading is stopped', () => {
    const loadingObservable = loadingService.Loading;
    let notified = false;

    loadingObservable.subscribe(() => {
      notified = true;
    });

    loadingService.stopModifierLoading();

    expect(notified).toBeFalse();
  });

  it('should not notify when only viewer loading is stopped', () => {
    const loadingObservable = loadingService.Loading;
    let notified = false;

    loadingObservable.subscribe(() => {
      notified = true;
    });

    loadingService.stopViewerLoading();

    expect(notified).toBeFalse();
  });

  it('should reset the loading flags to true', () => {
    loadingService.stopModifierLoading();
    loadingService.stopViewerLoading();
    loadingService.reset();

    expect(loadingService['logModifierLoading']).toBeTrue();
    expect(loadingService['logViewerLoading']).toBeTrue();
  });
});
