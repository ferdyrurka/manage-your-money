import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ImportOperationsDto} from '../dto/import-operations.dto';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Apollo, QueryRef} from 'apollo-angular';
import {gql} from '@apollo/client/core';
import {map} from 'rxjs/operators';
import {DataForGraphFactory} from '../factory/data-for-graph.factory';
import {DataForGraphDto} from '../dto/data-for-graph.dto';
import {OperationFactory} from '../factory/operation.factory';
import {OperationDto} from '../dto/operation.dto';
import {Operation} from '../entity/operation';

@Injectable()
export class OperationApi {
  private readonly uri: string = '/api/operations';

  private findAllQuery: QueryRef<any>|null = null;

  public constructor(
    private http: HttpClient,
    private apollo: Apollo,
    private dataForGraphFactory: DataForGraphFactory,
    private factory: OperationFactory,
  ) {
  }

  public import(importModel: ImportOperationsDto): Observable<any> {
    const data = new FormData();
    data.append('file', importModel.file, importModel.file.name);

    return this.http.post(
      environment.apiUrl + '/api/v1/operation/import',
      data,
    );
  }

  public findAllForGraph(afterDate: string, greaterThan: number | null, lessThan: number | null): Observable<DataForGraphDto[]> {
    return this.http.get(
      environment.apiUrl + this.uri,
      {
        headers: new HttpHeaders(
          {
            'Content-Type':  'application/json',
          }
        ),
        params: {
          'payAt[after]': afterDate,
          'amount[gte]': greaterThan !== null ? greaterThan.toString() : '',
          'amount[lte]': lessThan !== null ? lessThan.toString() : '',
          'order[payAt]': 'ASC',
          pagination: 'false',
        }
      }
    )
      .pipe(
        map((res: any) => this.dataForGraphFactory.createForShortGraph(res))
      );
  }

  public findAll(
    limit: number,
    after: string | null,
    before: string | null
  ): Observable<{ result: OperationDto[]; totalCount: number }> {
    if (this.findAllQuery === null) {
      this.findAllQuery = this.apollo
        .watchQuery({
          query: gql`
           query FindAll($limit: Int!, $after: String, $before: String) {
            operations(first: $limit, after: $after, before: $before, , order: {payAt: "DESC"}) {
              totalCount,
              edges {
                node {
                  id,
                  amount,
                  payAt,
                  balanceAfterSurgery,
                  description,
                  location {
                    id,
                    name,
                  }
                  type {
                    id,
                    name
                  }
                }
                cursor
              }
            }
           }
          `,
          variables: {limit, after, before}
        });
    } else {
      this.findAllQuery.refetch({limit, after, before});
    }

    return this.findAllQuery
      .valueChanges
      .pipe(
        map((result: any) => result.data.operations)
      )
      .pipe(
        map(
          (result: any) => {
            return {
              totalCount: result.totalCount,
              result: this.factory.findAllToResultModels(result.edges),
            };
          }
        )
      );
  }

  public findAllRefresh(): void {
    this.findAllQuery.refetch();
  }

  public save(operation: Operation): Observable<Operation> {
    if (operation.id) {
      return this.http.put<Operation>(
        environment.apiUrl + operation.id,
        operation
      );
    }

    return this.http.post<Operation>(
      environment.apiUrl + this.uri,
      operation
    );
  }
}
