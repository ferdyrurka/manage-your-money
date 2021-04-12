import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {TypeModel} from '../../../model/type.model';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {TypeApi} from '../../../api/type.api';
import {ErrorMessageService} from '../../../../shared/service/error-message.service';
import {FormComponent} from '../form/form.component';
import {PaginatorGraphqlService} from '../../../../shared/service/paginator-graphql.service';
import {PageSizeOptions} from '../../../../shared/paginator/page-size-options';

@Component({
  selector: 'app-operation-component-type-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() public eventEmitter: EventEmitter<string>;

  public readonly displayedColumns = ['id', 'name', 'update'];

  public loading = true;

  public types: TypeModel[] = [];

  public typesCount = 0;

  public limit = 10;

  public pageSizeOptions: number[] = [];

  private typeSubscription: Subscription;

  private modalSubscription: Subscription;

  private eventEmitterSubscription: Subscription;

  private pageEvent: PageEvent = null;

  constructor(
    private modal: MatDialog,
    private typeApi: TypeApi,
    private errorMessageService: ErrorMessageService
  ) { }

  ngOnInit(): void {
    this.loadNewData();

    this.eventEmitterSubscription = this.eventEmitter
      .subscribe((event) => {
        if (event === 'refresh:operation:type:list') {
          this.refreshData();
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.typeSubscription) {
      this.typeSubscription.unsubscribe();
    }

    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }

    this.eventEmitterSubscription.unsubscribe();
  }

  public openUpdateModal(model: TypeModel): void {
    this.modalSubscription = this.modal
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
            this.modalSubscription.unsubscribe();
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
    const paginatorData = PaginatorGraphqlService.getAfterAndBeforeByPageEvent(this.pageEvent, this.types);

    this.load(paginatorData.after, paginatorData.before);
  }

  private refreshData(): void
  {
    this.typeApi.findAllRefresh();
  }

  private load(after: string|null, before: string|null): void
  {
    this.loading = true;

    if (this.typeSubscription instanceof Subscription) {
      this.typeApi.findAll(this.limit, after, before);
      return;
    }

    this.typeSubscription = this.typeApi
      .findAll(this.limit, after, before)
      .subscribe(
        (data) => {
          this.types = data.result;
          this.typesCount = data.totalCount;

          this.pageSizeOptions = PageSizeOptions.getSizeOptions(this.typesCount);

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
