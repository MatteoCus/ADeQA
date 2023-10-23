import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle to dark theme', () => {
    service.toggleTheme(true);
    expect(document.body.classList.contains('theme-dark')).toBeTruthy();
    expect(document.body.classList.contains('theme-light')).toBeFalsy();
  });

  it('should toggle to light theme', () => {
    service.toggleTheme(false);
    expect(document.body.classList.contains('theme-light')).toBeTruthy();
    expect(document.body.classList.contains('theme-dark')).toBeFalsy();
  });

  it('should toggle to light theme after dark theme', () => {
    // First, set the theme to dark
    service.toggleTheme(true);

    // Then, toggle back to light theme
    service.toggleTheme(false);

    expect(document.body.classList.contains('theme-light')).toBeTruthy();
    expect(document.body.classList.contains('theme-dark')).toBeFalsy();
  });
});
