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

  lengthData: any = length_data;

  dataSource: LengthData[] = [];

  @ViewChild(DxChartComponent, { static: false }) chart: DxChartComponent | undefined;

  constructor() {
    const differentLengths = new Set(this.lengthData.map( (data: { lung: any; }) => data.lung));

    differentLengths.forEach( length => {
      let singlePoint: LengthData = {len:0, len_counts:0};

      singlePoint.len = length as any as number;
      singlePoint.len_counts = this.lengthData.filter( (data: { lung: any; }) => data.lung == length).length;

      this.dataSource.push(singlePoint);

    })
  };

      // Shows the tooltip only when a user clicks a series point
      onPointClick (e: { target: any; }) {
        let point = e.target;
        point.showTooltip();
    }
    // Hides the tooltip once the user moves away from the series point
    onPointHoverChanged (e: { target: any; }) {
        let point = e.target;
        if (!point.isHovered()) {
            point.hideTooltip();
        }
    }

  hideTooltip () {
    this.chart!.instance.hideTooltip();
};

}
