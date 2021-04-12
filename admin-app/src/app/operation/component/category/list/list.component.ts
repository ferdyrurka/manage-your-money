import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {ErrorMessageService} from '../../../../shared/service/error-message.service';
import {TypeModel} from '../../../model/type.model';
import {FormComponent} from '../form/form.component';
import {PaginatorGraphqlService} from '../../../../shared/service/paginator-graphql.service';
import {PageSizeOptions} from '../../../../shared/paginator/page-size-options';
import {CategoryApi} from '../../../api/category.api';
import {CategoryModel} from '../../../model/category.model';

@Component({
  selector: 'app-operation-component-category-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  @Input() public eventEmitter: EventEmitter<string>;

  public readonly displayedColumns = ['id', 'name', 'update'];

  public loading = true;

  public categories: CategoryModel[] = [];

  public pageSizeOptions: number[] = [];

  public categoriesCount = 0;

  public limit = 10;

  private categoriesSubscription: Subscription|null = null;

  private eventEmitterSubscription: Subscription|null = null;

  private pageEvent: PageEvent = null;

  constructor(
    private modal: MatDialog,
    private categoryApi: CategoryApi,
    private errorMessageService: ErrorMessageService,
  ) { }

  ngOnInit(): void {
    this.loadNewData();

    this.eventEmitterSubscription = this.eventEmitter
      .subscribe((event) => {
          if (event === 'refresh:operation:category:list') {
            this.refreshData();
          }
        }
      );
  }

  ngOnDestroy() {
    this.categoriesSubscription?.unsubscribe();
    this.eventEmitterSubscription?.unsubscribe();
  }

  public openUpdateModal(model: TypeModel): void {
    this.modal
      .open(
        FormComponent,
        {
          minWidth: '320px',
          maxWidth: '640px',
          maxHeight: '99vh',
          width: '100%',
          data: {
            model,
          },
        }
      )
      .afterClosed()
      .subscribe(
        (data) => {
          if (data && data.successSave) {
            this.refreshData();
          }
        },
      );
  }

  public pageHandle(event: PageEvent): void {
    this.pageEvent = event;

    if (this.limit !== this.pageEvent.pageSize) {
      this.limit = this.pageEvent.pageSize;
      this.loadNewData();
      return;
    }

    if (this.pageEvent.previousPageIndex !== this.pageEvent.pageIndex) {
      this.loadNewData();
    }
  }

  private loadNewData(): void
  {
    const paginatorData = PaginatorGraphqlService.getAfterAndBeforeByPageEvent(this.pageEvent, this.categories);

    this.load(paginatorData.after, paginatorData.before);
  }

  private refreshData(): void
  {
    this.categoryApi.findAllRefresh();
  }

  private load(after: string|null, before: string|null): void {
    this.loading = true;

    if (this.categoriesSubscription instanceof Subscription) {
      this.categoryApi.findAll(this.limit, after, before);
      return;
    }

    this.categoriesSubscription = this.categoryApi
      .findAll(this.limit, after, before)
      .subscribe(
        (data) => {
          this.categories = data.result;
          this.categoriesCount = data.totalCount;

          this.pageSizeOptions = PageSizeOptions.getSizeOptions(this.categoriesCount);

          this.loading = false;
        },
        (err) => {
          this.loading = false;
          this.errorMessageService.show();

          console.error(err);
        },
      );
  }
}
