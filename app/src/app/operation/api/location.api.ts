import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Apollo, QueryRef} from 'apollo-angular';
import {gql} from '@apollo/client/core';
import {map} from 'rxjs/operators';
import {LocationFactory} from '../factory/location.factory';
import {LocationDto} from '../dto/location.dto';

@Injectable()
export class OperationApi {
  public constructor(
    private http: HttpClient,
    private apollo: Apollo,
    private factory: LocationFactory,
  ) {
  }

  public findAllBasicData(): Observable<{ result: LocationDto[]; }> {
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
            return {result: this.factory.findAllToResultModels(result.edges)};
          }
        )
      );
  }
}
