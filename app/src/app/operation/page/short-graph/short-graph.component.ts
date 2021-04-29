import { Component, OnInit } from '@angular/core';
import {OperationApi} from '../../api/operation.api';
import {DataForGraphModel} from '../../model/data-for-graph.model';
import {ErrorMessageService} from '../../../shared/service/error-message.service';
import moment from 'moment';
import {GraphDateModel} from '../../model/graph-date.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-short-graph',
  templateUrl: './short-graph.component.html',
  styleUrls: ['./short-graph.component.scss']
})
export class ShortGraphComponent implements OnInit {
  public operationsExpenseObservable: Observable<DataForGraphModel[]>;
  public operationsIncomingObservable: Observable<DataForGraphModel[]>;

  constructor(private operationApi: OperationApi, private errorMessageService: ErrorMessageService) { }

  ngOnInit(): void {
    const date: string = moment().subtract(GraphDateModel.AFTER_DAYS, 'days').format('YYYY-MM-DD');

    this.operationsExpenseObservable = this.operationApi.findAllForGraph(date, null, 0);
    this.operationsIncomingObservable = this.operationApi.findAllForGraph(date, 0, null);

    this.operationsExpenseObservable.subscribe(
      () => {},
      (err) => {
        console.error(err);
        this.errorMessageService.show();
      }
    );

    this.operationsIncomingObservable.subscribe(
      () => {},
      (err) => {
        console.error(err);
        this.errorMessageService.show();
      }
    );
  }
}
