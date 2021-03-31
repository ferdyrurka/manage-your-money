import {CursorModel} from './cursor.model';
import {LocationModel} from './location.model';

export class CategoryModel extends CursorModel {
  public id: string;

  public name: string;

  public locations: LocationModel[];

  public slugs: {[key: string]: any};
}
