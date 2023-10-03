import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit{
  @ViewChild('languageSelect') select: any;

  public isDark : boolean = false;

  public today: Date = new Date();

  public user: string = "";

  public languages: string[] = ["Italiano", "Inglese", "Spagnolo"];

  public activeLanguage: string = "Italiano";

  constructor(private authInfoService: AuthInformationsService){
  }

  ngOnInit(): void {
    this.user = this.authInfoService.UserName;
    this.isDark = this.authInfoService.UserTheme == "DM" as "DM" | "WM";
    this.updateView();
  }

  private updateView(): void {
    if(this.isDark){
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
    }
  }

  public changeActiveLanguage(language: string) : void {
    this.activeLanguage = language;
  }

  public toggleTheme({checked}: MatSlideToggleChange): void {
    this.isDark = checked;
    this.updateView();
    
  }

}
