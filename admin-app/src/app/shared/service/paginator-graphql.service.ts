import { PageEvent } from '@angular/material/paginator';
import {CursorModel} from '../../operation/model/cursor.model';

export class PaginatorGraphqlService {
  public static getAfterBeforeByPageEvent(event: PageEvent, models: CursorModel[]): {after: string|null, before: string|null} {
    let after: string|null = null;
    let before: string|null = null;

    if (event != null && event.pageIndex > 0) {
      if (event.previousPageIndex < event.pageIndex) {
        if (!models[event.pageSize - 1]) {
          throw Error('Required next page data!');
        }

        after = models[event.pageSize - 1].cursor;
      } else {
        if (!models[0]) {
          throw Error('Required element by 0 index');
        }

        before = models[0].cursor;
      }
    }

    return {
      after,
      before,
    };
  }
}
