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
        model.location = {id: operation.location.id, name: operation.location.name};
      } else {
        model.location = null;
      }

      if (model.type) {
        model.type = {id: operation.type.id, name: operation.type.name};
      } else {
        model.type = null;
      }

      models.push(model);
    });

    return models;
  }
}
