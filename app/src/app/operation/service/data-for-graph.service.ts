import {Injectable} from '@angular/core';
import {DataForGraphModel} from '../model/data-for-graph.model';
import moment from 'moment';
import {GraphDateModel} from '../model/graph-date.model';
import {range} from 'rxjs';
import {CharDatasetShortGraphModel} from '../model/char-dataset-short-graph.model';
import {CharSingleDatasetShortGraphModel} from '../model/char-single-dataset-short-graph.model';

@Injectable()
export class DataForGraphService {
  // todo: refactoring to use in return model
  public groupByGeneralOperations(operations: DataForGraphModel[]): CharDatasetShortGraphModel<number[]>
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

    return new CharDatasetShortGraphModel<number[]>(labels, values);
  }

  public groupByTypeOperations(
    operations: DataForGraphModel[]
  ): CharDatasetShortGraphModel<CharSingleDatasetShortGraphModel[]> {
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

    return this.preparedResultDataForMultiCharDataset(sumPerWeekAmount);
  }

  public groupByCategoriesOperations(
    operations: DataForGraphModel[]
  ): CharDatasetShortGraphModel<CharSingleDatasetShortGraphModel[]> {
    const sumPerWeekAmount: {[key: string]: {[key: string]: number}} = {};

    operations.forEach((operation: DataForGraphModel) => {
      if (operation.categories === null) {
        return;
      }

      const key = this.getKey(operation);

      operation.categories.forEach((category) => {
        const mainKey = category.name;

        if (sumPerWeekAmount[mainKey] === undefined) {
          sumPerWeekAmount[mainKey] = {};
        }

        if (sumPerWeekAmount[mainKey][key] === undefined) {
          sumPerWeekAmount[mainKey][key] = 0;
        }

        sumPerWeekAmount[mainKey][key] += this.getAmount(operation);
      });
    });

    return this.preparedResultDataForMultiCharDataset(sumPerWeekAmount);
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

  private preparedResultDataForMultiCharDataset(
    sumPerWeekAmount: {[key: string]: {[key: string]: number}}
  ): CharDatasetShortGraphModel<CharSingleDatasetShortGraphModel[]> {
    const labels: string[] = [];
    const values: CharSingleDatasetShortGraphModel[] = [];

    for (const [label, amounts] of Object.entries(sumPerWeekAmount)) {
      const data: number[] = [];

      for (const [rangeDate, amount] of Object.entries(amounts)) {
        if (!labels.includes(rangeDate)) {
          labels.push(rangeDate);
        }

        data.push(amount);
      }

      values.push(new CharSingleDatasetShortGraphModel(label, data));
    }

    return new CharDatasetShortGraphModel<CharSingleDatasetShortGraphModel[]>(labels, values);
  }
}
