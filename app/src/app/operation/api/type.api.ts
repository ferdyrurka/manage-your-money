import { HttpClient } from '@angular/common/http';
import { TypeModel } from '../model/type.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class TypeApi {
  constructor(private http: HttpClient) {}

  public save(type: TypeModel): Observable<TypeModel> {
    return this.http.post<TypeModel>(
      environment.apiUrl + '/api/operation_types',
      type
    );
  }
}
