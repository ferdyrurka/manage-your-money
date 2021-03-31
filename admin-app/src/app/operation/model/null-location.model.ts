import {LocationModel} from './location.model';

export class NullLocationModel extends LocationModel {
  public constructor() {
    super();

    this.name = '';
    this.categoriesModelsCollection = [];
    this.slugs = [{slug: ''}];
  }
}
