import {Injectable} from '@angular/core';
import {DataForGraphModel} from '../model/data-for-graph.model';
import moment from 'moment';
import {GraphDateModel} from '../model/graph-date.model';

@Injectable()
export class DataForModelService {
  public groupByGeneralOperations(operations: DataForGraphModel[]): {labels: string[], values: number[]}
  {
    const sumPerWeekAmount: {[key: string]: number} = {};
    const dateFormat = 'YYYY-MM-DD';

    operations.forEach((operation: DataForGraphModel) => {
        const date = moment(operation.payAt);

        const key = date.startOf('isoWeek').format(dateFormat) + '-' + date.endOf('isoWeek').format(dateFormat);

        if (sumPerWeekAmount[key] === undefined) {
          sumPerWeekAmount[key] = 0;
        }

        let amount;

        if (operation.amount < 0) {
          amount = (operation.amount * -1);
        } else {
          amount = operation.amount;
        }

        sumPerWeekAmount[key] += amount;
    });

    const labels: string[] = [];
    const values: number[] = [];

    for (const [rangeDate, sumAmount] of Object.entries(sumPerWeekAmount)) {
      labels.push(rangeDate);
      values.push(sumAmount);
    }

    return {labels, values};
  }
}
