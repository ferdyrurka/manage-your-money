import {Injectable} from '@angular/core';
import {DataForGraphModel} from '../model/data-for-graph.model';
import moment from 'moment';
import {GraphDateModel} from '../model/graph-date.model';
import {range} from 'rxjs';

@Injectable()
export class DataForModelService {
  public groupByGeneralOperations(operations: DataForGraphModel[]): {labels: string[], values: number[]}
  {
    const sumPerWeekAmount: {[key: string]: number} = {};

    operations.forEach((operation: DataForGraphModel) => {
        const key = this.getKey(operation);

        if (sumPerWeekAmount[key] === undefined) {
          sumPerWeekAmount[key] = 0;
        }

        sumPerWeekAmount[key] += this.getAmount(operation);
    });

    const labels: string[] = [];
    const values: number[] = [];

    for (const [rangeDate, sumAmount] of Object.entries(sumPerWeekAmount)) {
      labels.push(rangeDate);
      values.push(sumAmount);
    }

    return {labels, values};
  }

  public groupByTypeOperations(
    operations: DataForGraphModel[]
  ): {labels: string[], values: {data: number[], label: string}[]} {
    const sumPerWeekAmount: {[key: string]: {[key: string]: number}} = {};

    operations.forEach((operation: DataForGraphModel) => {
      if (operation.type === null) {
        return;
      }

      const key = this.getKey(operation);
      const mainKey = operation.type.name;

      if (sumPerWeekAmount[mainKey] === undefined) {
        sumPerWeekAmount[mainKey] = {};
      }

      if (sumPerWeekAmount[mainKey][key] === undefined) {
        sumPerWeekAmount[mainKey][key] = 0;
      }

      sumPerWeekAmount[mainKey][key] += this.getAmount(operation);
    });

    const labels: string[] = [];
    const values: {data: number[], label: string}[] = [];

    for (const [label, amounts] of Object.entries(sumPerWeekAmount)) {
      const data: number[] = [];

      for (const [rangeDate, amount] of Object.entries(amounts)) {
        if (!labels.includes(rangeDate)) {
          labels.push(rangeDate);
        }

        data.push(amount);
      }

      values.push({data, label});
    }

    return {labels, values};
  }

  private getKey(operation: DataForGraphModel): string
  {
    const dateFormat = 'YYYY-MM-DD';
    const date = moment(operation.payAt);

    return date.startOf('isoWeek').format(dateFormat) + '-' + date.endOf('isoWeek').format(dateFormat);
  }

  private getAmount(operation: DataForGraphModel): number
  {
    if (operation.amount < 0) {
      return (operation.amount * -1);
    }

    return operation.amount;
  }
}
