import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ImportOperationsDto} from '../dto/import-operations.dto';
import {OperationDto} from '../dto/operation.dto';
import {LocationDto} from '../dto/location.dto';
import {TypeDto} from '../dto/type.dto';
import moment from 'moment';
import {Operation} from '../entity/operation';

@Injectable()
export class OperationFactory {
  public createForImport(form: FormGroup): ImportOperationsDto {
    const model = new ImportOperationsDto();
    model.file = form.get('file').value;

    return model;
  }

  public create(): OperationDto
  {
    const dto = new OperationDto();
    dto.payAt = moment().format('YYYY-MM-DD');
    dto.location = new LocationDto();

    return dto;
  }

  public createWriteModel(id: string|undefined, form: FormGroup): Operation {
    const writeModel = new Operation();
    writeModel.id = id;
    writeModel.amount = Number(form.get('amount').value);
    writeModel.payAt = form.get('payAt').value;
    writeModel.balanceAfterSurgery = Number(form.get('balanceAfterSurgery').value);

    writeModel.location = form.get('location').get('id')?.value;
    // writeModel.type = form.get('type').get('id')?.value;

    return writeModel;
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
