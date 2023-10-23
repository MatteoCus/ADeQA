import { TestBed } from '@angular/core/testing';

import { LanguageService } from './language.service';
import { TranslateModule } from '@ngx-translate/core';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ]
    });
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change the active language', () => {
    const newLanguage = 'es';
    const localStorageSetItemSpy = spyOn(localStorage, 'setItem');
    const activeLanguageSubjectSpy = spyOn(service.activeLanguage, 'next');

    service.changeLanguage(newLanguage);

    expect(localStorageSetItemSpy).toHaveBeenCalledWith('lang', newLanguage);
    expect(activeLanguageSubjectSpy).toHaveBeenCalledWith(newLanguage);
  });

  it('should set the default language if an invalid language is provided', () => {
    const invalidLanguage = 'fr'; // Assuming 'fr' is not a valid language
    const defaultLanguage = 'it';

    const localStorageSetItemSpy = spyOn(localStorage, 'setItem');
    const activeLanguageSubjectSpy = spyOn(service.activeLanguage, 'next');

    service.changeLanguage(invalidLanguage);

    expect(localStorageSetItemSpy).toHaveBeenCalledWith('lang', defaultLanguage);
    expect(activeLanguageSubjectSpy).toHaveBeenCalledWith(defaultLanguage);
  });
});
