import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {Observable} from 'rxjs';
import {DataForGraphDto} from '../../../dto/data-for-graph.dto';
import {DataForGraphService} from '../../../service/data-for-graph.service';
import {Colors} from '../../../service/colors';

@Component({
  selector: 'app-operation-component-short-graph-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {

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
  private operationsExpenseObservable: Observable<DataForGraphDto[]>;

  constructor(private dataForGraphService: DataForGraphService) { }

  ngOnInit(): void {
    this.operationsExpenseObservable.subscribe(
      (data: DataForGraphDto[]) => {
        const dataForGraph = this.dataForGraphService.groupByTypeOperations(data);

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
