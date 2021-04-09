import {Observable} from 'rxjs';
import {CategoryModel} from '../model/category.model';
import {Apollo, gql, QueryRef} from 'apollo-angular';
import {HttpClient} from '@angular/common/http';
import {LocationModel} from '../model/location.model';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable()
export class CategoryApi {
  private findAllQuery: QueryRef<any> | null = null;

  private readonly uri: string = '/api/operation_categories';

  constructor(private http: HttpClient, private apollo: Apollo) {
  }

  public findAllBasicData(): Observable<{ result: CategoryModel[]; }> {
    return this.apollo
      .query({
        query: gql`
          query findAllBasicData {
           operationCategories {
             edges {
               node {
                id
                name
               }
             }
           }
         }
        `,
      })
      .pipe(
        map((result: any) => result.data.operationCategories)
      )
      .pipe(
        map(
          (result: any) => {
            return { result: this.findAllToResultModels(result.edges) };
          }
        )
      );
  }

  public findAll(limit: number, after: string | null, before: string | null): Observable<{ result: CategoryModel[]; totalCount: number }> {
    if (this.findAllQuery === null) {
      this.findAllQuery = this.apollo
        .watchQuery({
          query: gql`
          query FindAll($limit: Int!, $after: String, $before: String) {
           operationCategories(first: $limit, after: $after, before: $before) {
             totalCount
             edges {
               node {
                id
                name
                locations {
                  edges {
                    node {
                      id
                      name
                    }
                  }
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
        map((result: any) => result.data.operationCategories)
      )
      .pipe(
        map(
          (result: any) => {
            return {
              totalCount: result.totalCount,
              result: this.findAllToResultModels(result.edges),
            };
          }
        )
      );
  }

  public findAllRefresh(): void {
    this.findAllQuery.refetch();
  }

  public save(category: CategoryModel): Observable<CategoryModel> {
    if (category.id) {
      return this.http.put<CategoryModel>(
        environment.apiUrl + category.id,
        category
      );
    }

    return this.http.post<CategoryModel>(
      environment.apiUrl + this.uri,
      category
    );
  }

  /*TODO: go to factory*/
  private findAllToResultModels(edges: []): CategoryModel[] {
    const result: CategoryModel[] = [];

    edges.forEach((category: any) => {
      const model = new CategoryModel();

      model.id = category.node.id;
      model.name = category.node.name;
      model.cursor = category?.cursor;
      model.locationsModelsCollection = [];

      if (category.node.locations) {
        category.node.locations.edges.forEach((location: any) => {
          const locationModel = new LocationModel();

          locationModel.id = location.node.id;
          locationModel.name = location.node.name;

          model.locationsModelsCollection.push(locationModel);
        });
      }

      result.push(model);
    });

    return result;
  }
}
