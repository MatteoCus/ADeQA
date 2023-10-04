import { Component } from '@angular/core';

@Component({
  selector: 'app-phases',
  templateUrl: './phases.component.html',
  styleUrls: ['./phases.component.scss']
})
export class PhasesComponent {

  phases: Array<number> = [...Array(150).keys()];

}
