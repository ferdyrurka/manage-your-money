import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {Observable} from 'rxjs';
import {DataForGraphModel} from '../../../model/data-for-graph.model';
import {Colors} from '../../../service/colors';
import {DataForGraphService} from '../../../service/data-for-graph.service';

@Component({
  selector: 'app-operation-component-short-graph-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public loading = true;

  public lineChartData: ChartDataSets[] = [];

  public lineChartLabels: Label[] = [];

  public lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public lineChartColors: Color[] = [];

  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartType = 'line';

  @Input()
  private operationsExpenseObservable: Observable<DataForGraphModel[]>;

  constructor(private dataForGraphService: DataForGraphService) { }

  ngOnInit(): void {
    this.operationsExpenseObservable.subscribe(
      (data: DataForGraphModel[]) => {
        const dataForGraph = this.dataForGraphService.groupByCategoriesOperations(data);

        this.lineChartLabels = dataForGraph.labels;

        dataForGraph.values.forEach(((value, index) => {
          this.lineChartData.push(value);

          this.lineChartColors.push(
            {
              borderColor: Colors.getStringColorByKey(index),
              backgroundColor: Colors.getRBGColorByKey(index),
            }
          );
        }));

        this.loading = false;
      },
    );
  }

}
