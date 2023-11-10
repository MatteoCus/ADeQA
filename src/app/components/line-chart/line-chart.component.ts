import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { LengthData } from 'src/app/models/length-data';
import { WidthData } from 'src/app/models/width-data';
import { length_data } from 'src/assets/mock-data/data';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {

  public chart: any;

  public chart2: any;

  public chart3: any;

  public chart4: any;

  lengthData: any = length_data;

  createCharts() {

    let lengthDataSource: LengthData[] = [];

    let widthDataSource: WidthData[] = [];

    const differentLengths = new Set(this.lengthData.map((data: { lung: any; }) => data.lung));

    const differentWidths = new Set(this.lengthData.map((data: { larg: any }) => data.larg));

    differentLengths.forEach(length => {
      let singleLengthPoint: LengthData = { len: 0, len_counts: 0 };

      singleLengthPoint.len = length as any as number;
      singleLengthPoint.len_counts = this.lengthData.filter((data: { lung: any; }) => data.lung == length).length;

      lengthDataSource.push(singleLengthPoint);

    });

    differentWidths.forEach(width => {
      let singleWidthPoint: WidthData = { wid: 0, wid_counts: 0 };

      singleWidthPoint.wid = width as any as number;
      singleWidthPoint.wid_counts = this.lengthData.filter((data: { larg: any; }) => data.larg == width).length;

      widthDataSource.push(singleWidthPoint);

    });


    lengthDataSource = lengthDataSource.sort((a, b) => { return a.len - b.len });

    widthDataSource = widthDataSource.sort((a, b) => { return a.wid - b.wid });

    const lengthMax = lengthDataSource.map(element => { return element.len; }).pop();
    const lengthMin = lengthDataSource.map(element => { return element.len; })[0];

    let lengthLabels: string[] = this.createLabels(lengthMin, lengthMax!);

    const widthMax = widthDataSource.map(element => { return element.wid; }).pop();
    const widthMin = widthDataSource.map(element => { return element.wid; })[0];

    let widthLabels: string[] = this.createLabels(widthMin, widthMax!);

    let chartName = "MyChart";
    this.createChart(chartName, lengthLabels, lengthDataSource.map(element => { return element.len_counts; }), this.chart, "Lunghezza", "line");

    chartName = "MyChart2";
    this.createChart(chartName, widthLabels, widthDataSource.map(element => { return element.wid_counts; }), this.chart2, "Larghezza", "bar");

    chartName = "MyChart3";
    this.createRoundChart(chartName, lengthLabels, lengthDataSource.map(element => { return element.len_counts; }), this.chart3, "Lunghezza", "doughnut");

    chartName = "MyChart4";
    this.createRoundChart(chartName, widthLabels, widthDataSource.map(element => { return element.wid_counts; }), this.chart4, "Larghezza", "pie");
  }


  private createChart(chartName: string, labels: string[], data: number[], chart: any, title: string, type: string) {
    chart = new Chart(chartName, {
      type: type as any,

      data: {
        labels: labels,
        datasets: [
          {
            label: "Numero di occorrenze della misura",
            data: data,
            borderColor: "#BF71FF",
            borderWidth: 2,
            cubicInterpolationMode: type == "line"? 'monotone' : 'default' ,
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: title
          }
        },
        scales: {
          x: {
            border: {
              color: '#707286'
            },
            grid: {
              display: true,
              color: "rgba(255,99,132,0.2)"
            }
          },
          y: {
            border: {
              color: '#707286'
            },
            grid: {
              display: true,
              color: "rgba(255,99,132,0.2)"
            }
          }
        }
      }
    });
  }

  private createRoundChart(chartName: string, labels: string[], data: number[], chart: any, title: string, type: string) {
    chart = new Chart(chartName, {
      type: type as any,

      data: {
        labels: labels,
        datasets: [
          {
            label: "Numero di occorrenze della misura",
            data: data,
            backgroundColor: [
              'red',
              'pink',
              'green',
              'yellow',
              'orange',
              'blue',			
            ],
            hoverOffset: 4
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: title
          }
        },
        scales: {
          x: {
            border: {
              color: '#707286'
            },
            grid: {
              display: true,
              color: "rgba(255,99,132,0.2)"
            }
          },
          y: {
            border: {
              color: '#707286'
            },
            grid: {
              display: true,
              color: "rgba(255,99,132,0.2)"
            }
          }
        }
      }
    });
  }



  private createLabels(min: number, max: number) {

    let labels: string[] = [];

    for (let i = min; i < max!; i = i + 0.1) {
      const value = parseFloat(i.toFixed(1));
      console.log(value);
      labels.push(value.toString());
    }
    return labels;
  }
}
