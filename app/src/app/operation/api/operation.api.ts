import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ImportOperationsModel} from '../model/import-operations.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class OperationApi {
  public constructor(private http: HttpClient) {
  }

  public import(importModel: ImportOperationsModel): Observable<any> {
    const data = new FormData();
    data.append('file', importModel.file, importModel.file.name);

    return this.http.post(
      environment.apiUrl + '/api/v1/operation/import',
      data,
    );
  }
}
