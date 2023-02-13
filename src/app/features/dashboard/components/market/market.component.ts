import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
declare var require: any;
var HighchartsGroupedCategories = require('highcharts-grouped-categories')(
  Highcharts
);

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {
  private chartInstance: Highcharts.Chart;
  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Total Revenue',
      align: 'left',
    },
    chart: {
      type: 'spline',
      scrollablePlotArea: {
        minWidth: 700,
      },
    },
    colors: [
      '#2fd83d',
      '#d82f75',
      '#8bbc21',
      '#910000',
      '#1aadce',
      '#492970',
      '#f28f43',
      '#77a1e5',
      '#c42525',
      '#a6c96a',
    ],
    credits: {
      enabled: false,
    },
    series: [
      {
        data: [1, 2, 1, 2, 2, 2, 1, 1, 2, 2.5, 2, 1],
        name: '3m',
      },
      {
        data: [2, 3, 2, 3, 2.5, 3, 3, 2.5, 3, 2, 2.5, 2],
        name: 'CONVATEC',
      },
    ],
    xAxis: {
      tickColor: '#eeeeee',
      lineColor: '#eeeeee',
      crosshair: {
        width: 2,
        color: 'gray',
        dashStyle: 'shortdot',
      },
      categories: [
        {
          name: '2021',
          categories: [
            {
              name: 'Q1',
              categories: ['Jan', 'Feb', 'Mar'],
            },
            {
              name: 'Q2',
              categories: ['Apr', 'May', 'Jun'],
            },
            {
              name: 'Q3',
              categories: ['Jul', 'Aug', 'Sep'],
            },
            {
              name: 'Q4',
              categories: ['Oct', 'Nov', 'Dec'],
            },
          ],
        },
      ],
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      borderColor: '#c96a9e',
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        className: 'popup-on-click',
        marker: {
          lineWidth: 1,
        },
      },
    },
    legend: {
      align: 'left',
      verticalAlign: 'top',
      borderWidth: 0,
    },
  } as any;

  constructor() {}

  ngOnInit(): void {
    this.reflowChart();
  }

  getChartInstance(chart: Highcharts.Chart): void {
    this.chartInstance = chart;
  }

  reflowChart() {
    setTimeout(() => {
      if (this.chartInstance) {
        this.chartInstance.reflow();
      }
    }, 0);
  }
}
