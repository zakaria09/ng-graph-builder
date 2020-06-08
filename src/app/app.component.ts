import { Component, ViewChild } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  graphDataForm: FormGroup;
  datasets: FormArray;
  get graphForm() {
    return this.graphDataForm.get('data') as FormArray;
  }

  chartTypes = [
    'doughnut',
    'bar',
    'pie',
  ];

  colours = [
    'blue',
    'green',
    'yellow',
    'grey',
    'orange',
    'purple'
  ]

  chartData: ChartDataSets[];
  chartLabels: Label[];
  chartType;
  chartLegend = true;
  chartcolour: Color[];
  chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.graphDataForm = this.formBuilder.group({
      chartType: '',
      data: this.formBuilder.array([])
    });
  }

  addData() {
    const graphInfo = this.formBuilder.group({
      label: [],
      data: [],
      colour: []
    });
    this.graphForm.push(graphInfo);
  }

  update() {
    this.chartType = this.graphDataForm.get('chartType').value;
    this.graphDataForm.get('chartType').valueChanges
      .subscribe(changedChartType => {
        this.chartType = changedChartType;
      });
    const dataSet = [];
    const dataLabels = [];
    const dataSetColour = [
      {
        backgroundColor: []
      }
    ];
    this.graphDataForm.value.data.map(graphObj => {
      dataSet.push(graphObj.data);
      dataLabels.push(graphObj.label);
      dataSetColour[0].backgroundColor.push(graphObj.colour);
    });
    this.chartData = [ { data: dataSet } ];
    this.chartLabels = dataLabels;
    this.chartcolour = dataSetColour;
  }

  reset() {
    this.chart.chart.clear();
  }
}
