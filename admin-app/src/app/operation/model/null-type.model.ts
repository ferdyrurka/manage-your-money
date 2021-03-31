import {TypeModel} from './type.model';

export class NullTypeModel extends TypeModel {
  public constructor() {
    super();
    this.name = '';
    this.slugs = [{slug: ''}];
  }
}
