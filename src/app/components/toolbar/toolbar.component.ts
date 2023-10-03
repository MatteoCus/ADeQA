import { Component, ViewChild } from '@angular/core';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @ViewChild('languageSelect') select: any;

  public today = new Date();

  public user = this.authInfoService.UserName;

  public languages = ["Italiano", "Inglese", "Spagnolo"];

  public activeLanguage = "Italiano";

  constructor(private authInfoService: AuthInformationsService) {
  }

  public changeActiveLanguage(language: string) : void {
    this.activeLanguage = language;
  }

}
