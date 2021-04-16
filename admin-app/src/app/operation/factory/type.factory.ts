import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TypeModel} from '../model/type.model';
import {SlugFactory} from './slug.factory';

@Injectable()
export class TypeFactory {
  public constructor(private slugFactory: SlugFactory) {
  }

  public setFromFormGroup(type: TypeModel, form: FormGroup): void {
    type.name = form.get('name')?.value;
    type.slugs = this.slugFactory.getParsedSlugs(form.get('slugs')?.value);
  }

  public create(): TypeModel {
    const type = new TypeModel();
    type.name = '';
    type.slugs = [''];

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
