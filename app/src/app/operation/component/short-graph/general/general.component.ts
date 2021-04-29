import {Component, Input, OnInit} from '@angular/core';
import {DataForGraphModel} from '../../../model/data-for-graph.model';
import {Color, Label} from 'ng2-charts';
import {ChartDataSets} from 'chart.js';
import {DataForModelService} from '../../../service/data-for-model.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-operation-component-short-graph-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  public loading = false;

  public lineChartData: ChartDataSets[] = [
    {data: [], label: 'Your expenses by week'},
    {data: [], label: 'Your incoming money by week'},
  ];

  public lineChartLabels: Label[] = [];

  public lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public lineChartColors: Color[] = [
    {
      borderColor: 'white',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
    {
      borderColor: 'red',
      backgroundColor: 'rgba(255,255,0,0.5)',
    },
  ];

  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartType = 'line';

  @Input()
  private operationsExpenseObservable: Observable<DataForGraphModel[]>;

  @Input()
  private operationsIncomingObservable: Observable<DataForGraphModel[]>;

  constructor(private dataForModelService: DataForModelService) {
  }

  ngOnInit(): void {
    this.operationsExpenseObservable.subscribe(
      (operations: DataForGraphModel[]) => {
        const groupByData = this.dataForModelService.groupByGeneralOperations(operations);

        this.lineChartData[0].data = groupByData.values;
        this.lineChartLabels = groupByData.labels;

        this.loading = false;
      }
    );

    this.operationsIncomingObservable.subscribe(
      (operations: DataForGraphModel[]) => {
        const groupByData = this.dataForModelService.groupByGeneralOperations(operations);

        this.lineChartData[1].data = groupByData.values;
        this.loading = false;
      }
    );
  }
}
