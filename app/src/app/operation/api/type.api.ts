import { HttpClient } from '@angular/common/http';
import { TypeModel } from '../model/type.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Apollo, gql } from 'apollo-angular';
import {map} from 'rxjs/operators';

@Injectable()
export class TypeApi {
  constructor(private http: HttpClient, private apollo: Apollo) {}

  public findAll(limit: number, after: string|null, before: string|null): Observable<{result: TypeModel[]; totalCount: number}> {
    return this.apollo
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
             pageInfo {
               hasNextPage
             }
           }
         }
        `,
        variables: { limit, after, before }
      })
      .valueChanges
      .pipe(
        map((result: any) => result.data.operationTypes)
      )
      .pipe(
        map(
          result => {
            return {
              totalCount: result.totalCount,
              result: this.findAllToResultModels(result.edges),
            };
          }
        )
      );
  }

  public save(type: TypeModel): Observable<TypeModel> {
    return this.http.post<TypeModel>(
      environment.apiUrl + '/api/operation_types',
      type
    );
  }

  private findAllToResultModels(edges: []): TypeModel[] {
    const result: TypeModel[] = [];

    edges.forEach((edge: any) => {
      const model = new TypeModel();

      model.id = edge.node.id;
      model.name = edge.node.name;
      model.slugs = edge.node.slugs;
      model.cursor = edge.cursor;

      result.push(model);
    });

    return result;
  }
}
