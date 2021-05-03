import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ImportOperationsDto} from '../dto/import-operations.dto';
import {OperationDto} from '../dto/operation.dto';
import {LocationDto} from '../dto/location.dto';
import {TypeDto} from '../dto/type.dto';
import moment from 'moment';

@Injectable()
export class OperationFactory {
  public createForImport(form: FormGroup): ImportOperationsDto {
    const model = new ImportOperationsDto();
    model.file = form.get('file').value;

    return model;
  }

  public findAllToResultModels(edges: []): OperationDto[] {
    const result: OperationDto[] = [];

    edges.forEach((operation: any) => {
      const model = new OperationDto();
      const operationNode = operation.node;

      model.id = operationNode.id;
      model.amount = operationNode.amount;
      model.balanceAfterSurgery = operationNode.balanceAfterSurgery;
      model.description = operationNode.description;
      model.payAt = moment(operationNode.payAt).format('YYYY-MM-DD');
      model.cursor = operation.cursor;
      model.location = null;
      model.type = null;

      if (operationNode.location !== null) {
        model.location = new LocationDto();
        model.location.name = operationNode.location.name;
        model.location.id = operationNode.location.id;
      }

      if (operationNode.type) {
        model.type = new TypeDto();
        model.type.name = operationNode.type.name;
        model.type.id = operationNode.type.id;
      }

      result.push(model);
    });

    return result;
  }
}
