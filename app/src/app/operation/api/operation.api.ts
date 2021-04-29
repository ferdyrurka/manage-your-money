import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ImportOperationsModel} from '../model/import-operations.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Apollo, QueryRef} from 'apollo-angular';
import {gql} from '@apollo/client/core';
import {map} from 'rxjs/operators';
import {DataForGraphFactory} from '../factory/data-for-graph.factory';
import {DataForGraphModel} from '../model/data-for-graph.model';

@Injectable()
export class OperationApi {
  private readonly uri: string = '/api/operation';

  public constructor(
    private http: HttpClient,
    private apollo: Apollo,
    private dataForGraphFactory: DataForGraphFactory,
  ) {
  }

  public import(importModel: ImportOperationsModel): Observable<any> {
    const data = new FormData();
    data.append('file', importModel.file, importModel.file.name);

    return this.http.post(
      environment.apiUrl + '/api/v1/operation/import',
      data,
    );
  }

  public findAllForGraph(afterDate: string, greaterThan: number | null, lessThan: number | null): Observable<DataForGraphModel[]> {
    return this.apollo
      .query({
        query: gql`
            query FindAllForGraph($afterDate: String, $greaterThan: String, $lessThan: String) {
              operations(payAt: {after: $afterDate}, amount: {lte: $lessThan, gte: $greaterThan}, order: {payAt: "ASC"}) {
                id,
                amount,
                payAt,
                location {
                  id
                  name,
                }
                type {
                  id,
                  name
                }
              }
           }
          `,
        variables: {
          afterDate,
          greaterThan: greaterThan !== null ? greaterThan.toString() : '',
          lessThan: lessThan !== null ? lessThan.toString() : '',
        }
      })
      .pipe(map((res: any) => res.data.operations))
      .pipe(
        map((res: any) => this.dataForGraphFactory.createForShortGraph(res))
      );
  }
}
