import {CursorModel} from './cursor.model';
import {CategoryModel} from './category.model';

export class LocationModel extends CursorModel {
  public id: string;

  public name: string;

  public operationCategories: string[];

  public categoriesModelsCollection: CategoryModel[];

  public slugs: string[];
}
