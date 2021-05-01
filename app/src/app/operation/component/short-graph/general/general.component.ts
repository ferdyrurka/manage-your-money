import {Component, Input, OnInit} from '@angular/core';
import {DataForGraphModel} from '../../../model/data-for-graph.model';
import {Color, Label} from 'ng2-charts';
import {ChartDataSets} from 'chart.js';
import {DataForGraphService} from '../../../service/data-for-graph.service';
import {Observable} from 'rxjs';
import {Colors} from '../../../service/colors';

@Component({
  selector: 'app-operation-component-short-graph-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  public loading = true;

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
      borderColor: 'red',
      backgroundColor: Colors.getRBGColorByName('red'),
    },
    {
      borderColor: 'green',
      backgroundColor: Colors.getRBGColorByName('green'),
    },
  ];

  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartType = 'line';

  @Input()
  private operationsExpenseObservable: Observable<DataForGraphModel[]>;

  @Input()
  private operationsIncomingObservable: Observable<DataForGraphModel[]>;

  constructor(private dataForModelService: DataForGraphService) {
  }

  ngOnInit(): void {
    this.operationsExpenseObservable.subscribe(
      (operations: DataForGraphModel[]) => {
        const groupByData = this.dataForModelService.groupByGeneralOperations(operations);

        this.lineChartData[0].data = groupByData.values;

        if (this.lineChartLabels.length < groupByData.labels.length) {
          this.lineChartLabels = groupByData.labels;
        }

        this.loading = false;
      }
    );

    this.operationsIncomingObservable.subscribe(
      (operations: DataForGraphModel[]) => {
        const groupByData = this.dataForModelService.groupByGeneralOperations(operations);

        this.lineChartData[1].data = groupByData.values;

        if (this.lineChartLabels.length < groupByData.labels.length) {
          this.lineChartLabels = groupByData.labels;
        }

        this.loading = false;
      }
    );
  }
}
