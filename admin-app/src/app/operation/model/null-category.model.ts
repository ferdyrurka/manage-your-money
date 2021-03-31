import {CursorModel} from './cursor.model';
import {LocationModel} from './location.model';
import {CategoryModel} from './category.model';

export class NullCategoryModel extends CategoryModel {
  constructor() {
    super();
    this.name = '';
    this.slugs = [{slug: ''}];
  }
}
