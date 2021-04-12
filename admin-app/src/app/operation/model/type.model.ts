import {CursorModel} from './cursor.model';

export class TypeModel extends CursorModel {
  public name: string;

  public slugs: [{slug: string}];

  public id: string;
}
