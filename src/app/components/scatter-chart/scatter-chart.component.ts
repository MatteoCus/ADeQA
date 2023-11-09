import { Component } from '@angular/core';
import { LengthData } from 'src/app/models/length-data';
import { length_data } from 'src/assets/mock-data/data';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.scss']
})
export class ScatterChartComponent {

  expectedLength : number = 40;

  expectedHeight: number = 20;

  maxLength: number = this.expectedLength * 1.05;

  minLength: number = this.expectedLength * 0.95;

  maxHeight: number = this.expectedHeight * 1.05;

  minHeight: number = this.expectedHeight * 0.95;

  dataSource: any[] = length_data;

  constructor() {
  }
}
