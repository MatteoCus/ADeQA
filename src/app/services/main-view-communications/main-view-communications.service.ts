import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { QualitysavelogModel } from 'src/app/api/models';

@Injectable({
  providedIn: 'root'
})
export class MainViewCommunicationsService {

  public updateLog: Subject<QualitysavelogModel> = new Subject<QualitysavelogModel>();

  public viewUpdate: Subject<QualitysavelogModel> = new Subject<QualitysavelogModel>();

  constructor() { }
}
