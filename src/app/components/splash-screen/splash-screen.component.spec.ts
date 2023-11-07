import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplashScreenComponent } from './splash-screen.component';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { Subject } from 'rxjs';

describe('SplashScreenComponent', () => {
  let component: SplashScreenComponent;
  let fixture: ComponentFixture<SplashScreenComponent>;
  let loadingService: LoadingService;
  let loadingSubject: Subject<boolean>;

  beforeEach(() => {
    loadingSubject = new Subject<boolean>();
    loadingService = {
      Loading: loadingSubject,
    } as unknown as LoadingService;

    TestBed.configureTestingModule({
      declarations: [SplashScreenComponent],
      providers: [{ provide: LoadingService, useValue: loadingService }],
    });

    fixture = TestBed.createComponent(SplashScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial values for splashTransition, opacityChange, and showSplash', () => {
    expect(component.splashTransition).toContain('opacity');
    expect(component.opacityChange).toBe(1);
    expect(component.showSplash).toBeTrue();
  });

  it('should update opacityChange and hide splash-screen when loading completes', (done) => {
    component.ngOnInit(); // Initialize the component

    expect(component.opacityChange).toBeGreaterThan(0);

    loadingService.Loading.subscribe((show) => {
      if (!show) {
        setTimeout(() => {
          fixture.detectChanges();
          expect(component.showSplash).toBeFalse();
          expect(component.opacityChange).toBe(0);
          done();
        }, component.animationDuration * 1000 + 100); // Wait for animationDuration + 100ms
      }
    });

    loadingSubject.next(false); // Simulate loading completion
  });

  it('should not hide splash-screen if loading is still in progress', (done) => {
    component.ngOnInit(); // Initialize the component

    expect(component.opacityChange).toBeGreaterThan(0);

    loadingService.Loading.subscribe(() => {
      setTimeout(() => {
        fixture.detectChanges();
        expect(component.showSplash).toBeTrue();
        expect(component.opacityChange).toBeGreaterThan(0);
        done();
      }, component.animationDuration * 500); // Wait for half of the animationDuration
    });

    loadingSubject.next(true); // Simulate loading still in progress
  });
});
