import { HttpClient } from '@angular/common/http';
import { TypeModel } from '../model/type.model';

class TypeApi {
  constructor(private http: HttpClient) {}

  public save(type: TypeModel): void {}
}
