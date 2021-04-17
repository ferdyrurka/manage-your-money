import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ImportOperationsModel} from '../model/import-operations.model';

@Injectable()
export class OperationFactory {
  createForImport(form: FormGroup): ImportOperationsModel
  {
    const model = new ImportOperationsModel();
    model.file = form.get('file').value;

    return model;
  }
}
