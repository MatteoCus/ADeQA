import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading: Subject<boolean> = new Subject<boolean>();

  private logModifierLoading: boolean = true;

  private logViewerLoading: boolean = true;

  constructor() { }

  public get Loading() {
    return this.loading;
  }

  public stopModifierLoading(): void {
    this.logModifierLoading = false;

    if(this.logModifierLoading == this.logViewerLoading) {
      this.loading.next(false);
    }
  }

  public stopViewerLoading(): void {
    this.logViewerLoading = false;

    if(this.logModifierLoading == this.logViewerLoading) {
      this.loading.next(false);
    }
  }

  public reset(): void {
    this.logModifierLoading = true;
    this.logViewerLoading = true;
  }
}
