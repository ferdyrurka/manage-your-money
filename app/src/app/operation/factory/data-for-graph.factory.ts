import {Injectable} from '@angular/core';
import {DataForGraphDto} from '../dto/data-for-graph.dto';

@Injectable()
export class DataForGraphFactory {
  public createForShortGraph(operations: any): DataForGraphDto[]
  {
    const models: DataForGraphDto[] = [];

    operations.forEach(operation => {
      const model = new DataForGraphDto();
      model.amount = operation.amount;
      model.id = operation.id;
      model.payAt = operation.payAt;

      if (operation.location) {
        model.location = {name: operation.location.name};
        model.categories = this.buildCategories(operation.location.operationCategories);
      } else {
        model.location = null;
        model.categories = null;
      }

      if (operation.type) {
        model.type = {name: operation.type.name};
      } else {
        model.type = null;
      }

      models.push(model);
    });

    return models;
  }

  private buildCategories(operationCategories: {name: string}[]): {name: string}[]|null
  {
    if (operationCategories) {
      const categories = [];

      operationCategories.forEach((category) => {
        categories.push({name: category.name});
      });

      return categories;
    }

    return null;
  }
}
