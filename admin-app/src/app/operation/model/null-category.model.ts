import {CategoryModel} from './category.model';

export class NullCategoryModel extends CategoryModel {
  constructor() {
    super();
    this.name = '';
    this.locationsModelsCollection = [];
  }
}
