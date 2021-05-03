import { Component, OnInit } from '@angular/core';
import {OperationApi} from '../../api/operation.api';
import {DataForGraphDto} from '../../dto/data-for-graph.dto';
import {ErrorMessageService} from '../../../shared/service/error-message.service';
import moment from 'moment';
import {GraphDateDto} from '../../dto/graph-date.dto';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-short-graph',
  templateUrl: './short-graph.component.html',
  styleUrls: ['./short-graph.component.scss']
})
export class ShortGraphComponent implements OnInit {
  public operationsExpenseObservable: Observable<DataForGraphDto[]>;
  public operationsIncomingObservable: Observable<DataForGraphDto[]>;

  constructor(private operationApi: OperationApi, private errorMessageService: ErrorMessageService) { }

  ngOnInit(): void {
    const date: string = moment().subtract(GraphDateDto.AFTER_DAYS, 'days').format('YYYY-MM-DD');

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
