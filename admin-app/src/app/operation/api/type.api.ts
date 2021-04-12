import { HttpClient } from '@angular/common/http';
import { TypeModel } from '../model/type.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {Apollo, gql, QueryRef} from 'apollo-angular';
import {map} from 'rxjs/operators';
import {TypeFactory} from '../factory/type.factory';

@Injectable()
export class TypeApi {
  private findAllQuery: QueryRef<any>|null = null;

  private readonly uri: string = '/api/operation_types';

  constructor(private http: HttpClient, private apollo: Apollo, private factory: TypeFactory) {}

  public findAll(limit: number, after: string|null, before: string|null): Observable<{result: TypeModel[]; totalCount: number}> {
    if (this.findAllQuery === null) {
      this.findAllQuery = this.apollo
        .watchQuery({
          query: gql`
          query FindAll($limit: Int!, $after: String, $before: String) {
           operationTypes(first: $limit, after: $after, before: $before) {
             totalCount
             edges {
               node {
                 name
                 id
                 slugs
               }
               cursor
             }
           }
         }
        `,
          variables: { limit, after, before }
        });
    } else {
      this.findAllQuery.refetch({ limit, after, before });
    }

    return this.findAllQuery
      .valueChanges
      .pipe(
        map((result: any) => result.data.operationTypes)
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

  public findAllRefresh(): void
  {
    this.findAllQuery.refetch();
  }

  public save(type: TypeModel): Observable<TypeModel> {
    if (type.id) {
      return this.http.put<TypeModel>(
        environment.apiUrl + type.id,
        type
      );
    }

    return this.http.post<TypeModel>(
      environment.apiUrl + this.uri,
      type
    );
  }
}
