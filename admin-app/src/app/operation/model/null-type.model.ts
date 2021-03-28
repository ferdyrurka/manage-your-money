import {TypeModel} from './type.model';

export class NullTypeModel extends TypeModel {
  public readonly name = '';

  public readonly slugs = [{slug: ''}];
}
