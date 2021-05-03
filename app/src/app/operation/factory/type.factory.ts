import {Injectable} from '@angular/core';
import {TypeDto} from '../dto/type.dto';

@Injectable()
export class TypeFactory {
  public findAllToResultModels(edges: []): TypeDto[] {
    const result: TypeDto[] = [];

    edges.forEach((type: any) => {
      const model = new TypeDto();

      model.id = type.node.id;
      model.name = type.node.name;

      result.push(model);
    });

    return result;
  }
}
