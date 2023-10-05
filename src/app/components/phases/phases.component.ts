import { Component } from '@angular/core';

@Component({
  selector: 'app-phases',
  templateUrl: './phases.component.html',
  styleUrls: ['./phases.component.scss']
})
export class PhasesComponent {

  phases: Array<number> = [...Array(150).keys()];

  constructor(){}

  public select(id: string): void {
    document.getElementsByClassName("selected-card")[0]? document.getElementsByClassName("selected-card")[0].classList.remove("selected-card"): "";
    document.getElementById(id)?.classList.add("selected-card");
  }

}
