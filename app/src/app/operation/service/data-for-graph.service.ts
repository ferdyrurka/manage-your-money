import {Injectable} from '@angular/core';
import {DataForGraphDto} from '../dto/data-for-graph.dto';
import moment from 'moment';
import {GraphDateDto} from '../dto/graph-date.dto';
import {range} from 'rxjs';
import {CharDatasetShortGraphDto} from '../dto/char-dataset-short-graph.dto';
import {CharSingleDatasetShortGraphDto} from '../dto/char-single-dataset-short-graph.dto';

@Injectable()
export class DataForGraphService {
  // todo: refactoring to use in return dto
  public groupByGeneralOperations(operations: DataForGraphDto[]): CharDatasetShortGraphDto<number[]>
  {
    const sumPerWeekAmount: {[key: string]: number} = {};

    operations.forEach((operation: DataForGraphDto) => {
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

    return new CharDatasetShortGraphDto<number[]>(labels, values);
  }

  public groupByTypeOperations(
    operations: DataForGraphDto[]
  ): CharDatasetShortGraphDto<CharSingleDatasetShortGraphDto[]> {
    const sumPerWeekAmount: {[key: string]: {[key: string]: number}} = {};

    operations.forEach((operation: DataForGraphDto) => {
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
    operations: DataForGraphDto[]
  ): CharDatasetShortGraphDto<CharSingleDatasetShortGraphDto[]> {
    const sumPerWeekAmount: {[key: string]: {[key: string]: number}} = {};

    operations.forEach((operation: DataForGraphDto) => {
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

  private getKey(operation: DataForGraphDto): string
  {
    const dateFormat = 'YYYY-MM-DD';
    const date = moment(operation.payAt);

    return date.startOf('isoWeek').format(dateFormat) + '-' + date.endOf('isoWeek').format(dateFormat);
  }

  private getAmount(operation: DataForGraphDto): number
  {
    if (operation.amount < 0) {
      return (operation.amount * -1);
    }

    return operation.amount;
  }

  private preparedResultDataForMultiCharDataset(
    sumPerWeekAmount: {[key: string]: {[key: string]: number}}
  ): CharDatasetShortGraphDto<CharSingleDatasetShortGraphDto[]> {
    const labels: string[] = [];
    const values: CharSingleDatasetShortGraphDto[] = [];

    for (const [label, amounts] of Object.entries(sumPerWeekAmount)) {
      const data: number[] = [];

      for (const [rangeDate, amount] of Object.entries(amounts)) {
        if (!labels.includes(rangeDate)) {
          labels.push(rangeDate);
        }

        data.push(amount);
      }

      values.push(new CharSingleDatasetShortGraphDto(label, data));
    }

    return new CharDatasetShortGraphDto<CharSingleDatasetShortGraphDto[]>(labels, values);
  }
}
