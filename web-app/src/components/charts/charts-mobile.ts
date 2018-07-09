import { inject, bindable } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { Data } from "scripts/data";
import { Chart as C } from 'chart.js';

@inject(EventAggregator)
export class ChartsMobile {
  @bindable data: Data;

  ea: EventAggregator;
  chartMax: number;

  constructor(EventAggregator) {
    this.ea = EventAggregator;
  }

  attached() {
    this.ea.subscribe("reload", r => {
      if (r === "reloaded") {
        this.buildCharts();
      }
    });

    this.buildCharts();
  }

  buildCharts() {
    let worstCtx = (document.getElementById("worst-chart") as HTMLCanvasElement).getContext("2d");
    let lowerCtx = (document.getElementById("lower-q-chart") as HTMLCanvasElement).getContext("2d");
    let medianCtx = (document.getElementById("median-chart") as HTMLCanvasElement).getContext("2d");
    let upperCtx = (document.getElementById("upper-q-chart") as HTMLCanvasElement).getContext("2d");
    this.chartMax = Math.ceil(Math.max(this.data.fixedIndexedUpperQuartile) * 2.5 / 10000) * 10000;

    let worstData = {
      labels: ["Worst Case"],
      datasets: [{
        label: "Brokerage",
        data: [this.data.brokerageWorstCase],
        backgroundColor: "rgb(148, 124, 176)",
        borderWidth: 0
      },
      {
        label: "Variable",
        data: [this.data.variableWorstCase],
        backgroundColor: "rgb(89, 171, 227)",
        borderWidth: 0
      },
      {
        label: "Fixed Indexed",
        data: [this.data.fixedIndexedWorstCase],
        backgroundColor: "rgb(4, 147, 114)",
        borderWidth: 0
      },
      {
        label: "Fixed",
        data: [this.data.fixed],
        backgroundColor: "rgb(135, 211, 124)",
        borderWidth: 0
      }]
    };

    let lowerData = {
      labels: ["Lower Quartile"],
      datasets: [{
        label: "Brokerage",
        data: [this.data.brokerageLowerQuartile],
        backgroundColor: "rgb(148, 124, 176)",
        borderWidth: 0
      },
      {
        label: "Variable",
        data: [this.data.variableLowerQuartile],
        backgroundColor: "rgb(89, 171, 227)",
        borderWidth: 0
      },
      {
        label: "Fixed Indexed",
        data: [this.data.fixedIndexedLowerQuartile],
        backgroundColor: "rgb(4, 147, 114)",
        borderWidth: 0
      },
      {
        label: "Fixed",
        data: [this.data.fixed],
        backgroundColor: "rgb(135, 211, 124)",
        borderWidth: 0
      }]
    };

    let medianData = {
      labels: ["Median"],
      datasets: [{
        label: "Brokerage",
        data: [this.data.brokerageMedian],
        backgroundColor: "rgb(148, 124, 176)",
        borderWidth: 0
      },
      {
        label: "Variable",
        data: [this.data.variableMedian],
        backgroundColor: "rgb(89, 171, 227)",
        borderWidth: 0
      },
      {
        label: "Fixed Indexed",
        data: [this.data.fixedIndexedMedian],
        backgroundColor: "rgb(4, 147, 114)",
        borderWidth: 0
      },
      {
        label: "Fixed",
        data: [this.data.fixed],
        backgroundColor: "rgb(135, 211, 124)",
        borderWidth: 0
      }]
    };

    let upperData = {
      labels: ["Upper Quartile"],
      datasets: [{
        label: "Brokerage",
        data: [this.data.brokerageUpperQuartile],
        backgroundColor: "rgb(148, 124, 176)",
        borderWidth: 0
      },
      {
        label: "Variable",
        data: [this.data.variableUpperQuartile],
        backgroundColor: "rgb(89, 171, 227)",
        borderWidth: 0
      },
      {
        label: "Fixed Indexed",
        data: [this.data.fixedIndexedUpperQuartile],
        backgroundColor: "rgb(4, 147, 114)",
        borderWidth: 0
      },
      {
        label: "Fixed",
        data: [this.data.fixed],
        backgroundColor: "rgb(135, 211, 124)",
        borderWidth: 0
      }]
    };

    new C(lowerCtx, {
      type: "bar",
      data: lowerData,
      options: this.getMobileChartOptions(true, false)
    });

    new C(medianCtx, {
      type: "bar",
      data: medianData,
      options: this.getMobileChartOptions(false, false)
    });

    new C(upperCtx, {
      type: "bar",
      data: upperData,
      options: this.getMobileChartOptions(false, true)
    });
  }

  getMobileChartOptions(isFirst: boolean, isLast: boolean) {
    return {
      layout: {
        padding: 0
      },
      legend: {
        display: isLast,
        position: "bottom",
        labels: {
          fontColor: "rgb(34, 34, 34)",
          fontFamily: "'PT Serif', 'Times New Roman', Times, serif",
          fontSize: 18,
          padding: 20
        }
      },
      tooltips: {
        titleFontFamily: "'PT Sans', 'Helvetica Neue', Helvetica, sans-serif",
        titleFontSize: 18,
        bodyFontFamily: "'PT Serif', 'Times New Roman', Times, serif",
        bodyFontSize: 18,
        displayColors: false,
        position: "average",
        callbacks: {
          label: function(tooltipItem, data) {
              let label = data.datasets[tooltipItem.datasetIndex].label || '';

              if (label) {
                  label += ': ';
              }
              label += "$" + tooltipItem.yLabel.format(2, 3);
              return label;
          }
        }
      },
      title: {
        display: isFirst,
        text: "Average yearly payout (USD)",
        fontColor: "rgb(34, 34, 34)",
        fontFamily: "'PT Sans', 'Helvetica Neue', Helvetica, sans-serif",
        fontSize: 20,
        padding: 30
      },
      maintainAspectRatio: true,
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            display: true,
            fontColor: "rgb(34, 34, 34)",
            fontFamily: "'PT Serif', 'Times New Roman', Times, serif",
            fontSize: 16,
            padding: 10
          },
          barPercentage: 1.0,
          categoryPercentage: 0.7
        }],
        yAxes: [{
          scaleLabel: {
            fontColor: "rgb(34, 34, 34)",
            fontFamily: "'PT Serif', 'Times New Roman', Times, serif",
            fontSize: 16
          },
          ticks: {
            display: true,
            max: this.chartMax,
            fontColor: "rgb(34, 34, 34)",
            fontFamily: "'PT Serif', 'Times New Roman', Times, serif",
            fontSize: 16,
            callback: function(value) {
              return '$' + value.format(2, 3);
            }
          }
        }]
      }
    };
  }
}
