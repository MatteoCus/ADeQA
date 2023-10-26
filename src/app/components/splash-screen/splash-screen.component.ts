import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent { 
  splashTransition: string = "";
  opacityChange: number = 1;
  showSplash = true;

  @Input() animationDuration: number = 0.5;

  constructor(private loadingService: LoadingService){
    this.loadingService.Loading.subscribe( show => {
        if(!show) {
          this.opacityChange = 0;
          setTimeout(() => {
            this.showSplash = !this.showSplash;
          }, this.animationDuration * 1000);
        }
      }
    )
  }

  ngOnInit(): void {
      let transitionStyle = "opacity " + this.animationDuration + "s";
      this.splashTransition = transitionStyle;
  }
}