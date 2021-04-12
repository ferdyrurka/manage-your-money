import { PageEvent } from '@angular/material/paginator';
import {CursorModel} from '../../operation/model/cursor.model';

export class PaginatorGraphqlService {
  public static getAfterAndBeforeByPageEvent(event: PageEvent, models: CursorModel[]): {after: string|null, before: string|null} {
    if (event === null || event.pageIndex === 0) {
      return {
        after: null,
        before: null,
      };
    }

    if (event.previousPageIndex < event.pageIndex) {
      if (!models[event.pageSize - 1]) {
        throw Error('Required next page data!');
      }

      return {
        after: models[event.pageSize - 1].cursor,
        before: null,
      };
    }

    if (!models[0]) {
      throw Error('Required element by 0 index');
    }

    return {
      after: null,
      before: models[0].cursor,
    };
  }
}
