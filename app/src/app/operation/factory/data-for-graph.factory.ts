import {Injectable} from '@angular/core';
import {DataForGraphModel} from '../model/data-for-graph.model';

@Injectable()
export class DataForGraphFactory {
  public createForShortGraph(operations: any): DataForGraphModel[]
  {
    const models: DataForGraphModel[] = [];

    operations.forEach(operation => {
      const model = new DataForGraphModel();
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

  private buildCategories(operationCategories: {edges: {node: {name: string}}[]}): {name: string}[]|null
  {
    if (operationCategories) {
      const categoriesEdges = operationCategories.edges;
      const categories = [];

      categoriesEdges.forEach((category) => {
        categories.push({name: category.node.name});
      });

      return categories;
    }

    return null;
  }
}
