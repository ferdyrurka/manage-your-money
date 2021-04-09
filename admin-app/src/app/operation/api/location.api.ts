import {Apollo, gql, QueryRef} from 'apollo-angular';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {LocationModel} from '../model/location.model';
import {CategoryModel} from '../model/category.model';
import {Injectable} from '@angular/core';

@Injectable()
export class LocationApi {
  private findAllQuery: QueryRef<any>|null = null;

  private readonly uri: string = '/api/operation_locations';

  constructor(private http: HttpClient, private apollo: Apollo) {}

  public findAllBasicData(): Observable<{ result: LocationModel[]; }> {
    return this.apollo
      .query({
        query: gql`
          query findAllBasicData {
           operationLocations {
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
        map((result: any) => result.data.operationLocations)
      )
      .pipe(
        map(
          (result: any) => {
            return { result: this.findAllToResultModels(result.edges) };
          }
        )
      );
  }

  public findAll(limit: number, after: string|null, before: string|null): Observable<{result: LocationModel[]; totalCount: number}> {
    if (this.findAllQuery === null) {
      this.findAllQuery = this.apollo
        .watchQuery({
          query: gql`
          query FindAll($limit: Int!, $after: String, $before: String) {
           operationLocations(first: $limit, after: $after, before: $before) {
             totalCount
             edges {
               node {
                id
                name
                slugs
                operationCategories {
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
          variables: { limit, after, before }
        });
    } else {
      this.findAllQuery.refetch({ limit, after, before });
    }

    return this.findAllQuery
      .valueChanges
      .pipe(
        map((result: any) => result.data.operationLocations)
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

  public findAllRefresh(): void
  {
    this.findAllQuery.refetch();
  }

  public save(location: LocationModel): Observable<LocationModel> {
    if (location.id) {
      return this.http.put<LocationModel>(
        environment.apiUrl + location.id,
        location
      );
    }

    return this.http.post<LocationModel>(
      environment.apiUrl + this.uri,
      location
    );
  }

  /*TODO: go to factory*/
  private findAllToResultModels(edges: []): LocationModel[] {
    const result: LocationModel[] = [];

    edges.forEach((location: any) => {
      const model = new LocationModel();

      model.id = location.node.id;
      model.name = location.node.name;
      model.slugs = location.node.slugs;
      model.cursor = location.cursor;
      model.categoriesModelsCollection = [];

      if (location.node.operationCategories) {
        location.node.operationCategories.edges.forEach((category: any) => {
          const categoryModel = new CategoryModel();

          categoryModel.id = category.node.id;
          categoryModel.name = category.node.name;

          model.categoriesModelsCollection.push(categoryModel);
        });
      }

      result.push(model);
    });

    return result;
  }
}
