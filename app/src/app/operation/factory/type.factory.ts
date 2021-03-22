import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TypeModel} from '../model/type.model';

@Injectable()
export class TypeFactory {
  public createFromFormGroup(form: FormGroup): TypeModel {
    const type = new TypeModel();

    type.name = form.get('name')?.value;
    type.slugs = form.get('slugs')?.value;

    return type;
  }
}
