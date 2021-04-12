import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TypeModel} from '../model/type.model';

@Injectable()
export class TypeFactory {
  public setFromFormGroup(type: TypeModel, form: FormGroup): void {
    type.name = form.get('name')?.value;
    type.slugs = form.get('slugs')?.value;
  }

  public create(): TypeModel {
    const type = new TypeModel();
    type.name = '';
    type.slugs = [{slug: ''}];

    return type;
  }

  public findAllToResultModels(edges: []): TypeModel[] {
    const result: TypeModel[] = [];

    edges.forEach((edge: any) => {
      const model = new TypeModel();

      model.id = edge.node.id;
      model.name = edge.node.name;
      model.slugs = edge.node.slugs;
      model.cursor = edge.cursor;

      result.push(model);
    });

    return result;
  }
}
