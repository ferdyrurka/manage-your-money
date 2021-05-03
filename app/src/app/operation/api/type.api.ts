import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import {gql} from '@apollo/client/core';
import {map} from 'rxjs/operators';
import {TypeFactory} from '../factory/type.factory';
import {TypeDto} from '../dto/type.dto';

@Injectable()
export class TypeApi {
  public constructor(
    private http: HttpClient,
    private apollo: Apollo,
    private factory: TypeFactory,
  ) {
  }

  public findAllBasicData(): Observable<{ result: TypeDto[]; }> {
    return this.apollo
      .query({
        query: gql`
          query findAllBasicData {
           operationTypes {
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
        map((result: any) => result.data.operationTypes)
      )
      .pipe(
        map(
          (result: any) => {
            return { result: this.factory.findAllToResultModels(result.edges) };
          }
        )
      );
  }
}
