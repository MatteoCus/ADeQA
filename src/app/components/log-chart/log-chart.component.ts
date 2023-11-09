import { Component, ViewChild } from '@angular/core';
import { DxChartComponent } from 'devextreme-angular';
import { LengthData } from 'src/app/models/length-data'
import { length_data } from 'src/assets/mock-data/data';

@Component({
  selector: 'app-log-chart',
  templateUrl: './log-chart.component.html',
  styleUrls: ['./log-chart.component.scss']
})
export class LogChartComponent {

  expectedLength : number = 40;

  maxLength: number = this.expectedLength * 1.05;

  minLength: number = this.expectedLength * 0.95;

  lengthData: any = length_data;

  dataSource: LengthData[] = [];


  customizePoint = (arg: any) => {
    if (arg.argument > this.maxLength || arg.argument < this.minLength) {
      return { color: '#ff7c7c', hoverStyle: { color: '#ff7c7c' } };
    }  else { return; }
  };

  customizeTooltip(arg: any) {
    console.log(arg);
    return {
      text: `${arg.value}`,
      color: "red"
    };
  }

  @ViewChild(DxChartComponent, { static: false }) chart: DxChartComponent | undefined;



  constructor() {
  
    const differentLengths = new Set(this.lengthData.map( (data: { lung: any; }) => data.lung));

    differentLengths.forEach( length => {
      let singlePoint: LengthData = {len:0, len_counts:0};

      singlePoint.len = length as any as number;
      singlePoint.len_counts = this.lengthData.filter( (data: { lung: any; }) => data.lung == length).length;

      this.dataSource.push(singlePoint);

    });


  };

}
