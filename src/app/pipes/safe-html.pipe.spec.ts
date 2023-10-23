import { SafePipe } from './safe-html.pipe';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';

describe('SafePipe', () => {
  let pipe: SafePipe;
  let sanitizer: DomSanitizer;
  let sanitizerSpy: jasmine.Spy;

  beforeEach(() => {
    sanitizer = jasmine.createSpyObj('DomSanitizer', ['sanitize']);
    sanitizerSpy = sanitizer.sanitize as jasmine.Spy;
    pipe = new SafePipe(sanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sanitize HTML', () => {
    const htmlString = '<div>Some <strong>HTML</strong></div>';
    sanitizerSpy.and.returnValue(htmlString);

    const safeHtml = pipe.transform(htmlString);

    expect(sanitizerSpy).toHaveBeenCalledWith(SecurityContext.HTML, htmlString);
    expect(safeHtml).toEqual(htmlString);
  });
});
