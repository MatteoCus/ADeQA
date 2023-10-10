import { Pipe, PipeTransform, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({name: 'safeHtml'})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer:DomSanitizer){}

  transform(style: string) {
    return this.sanitizer.sanitize(SecurityContext.HTML,style);
  }
}