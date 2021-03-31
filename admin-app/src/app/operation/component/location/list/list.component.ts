import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {TypeModel} from '../../../model/type.model';
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {ErrorMessageService} from '../../../../shared/service/error-message.service';
import {LocationModel} from '../../../model/location.model';
import {PaginatorGraphqlService} from '../../../../shared/service/paginator-graphql.service';
import {LocationApi} from '../../../api/location.api';
import {FormComponent} from '../form/form.component';
import {PageSizeOptions} from '../../../../shared/paginator/page-size-options';

@Component({
  selector: 'app-operation-component-location-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  @Input() public eventEmitter: EventEmitter<string>;

  public readonly displayedColumns = ['id', 'name', 'update'];

  public loading = true;

  public locations: LocationModel[] = [];

  public pageSizeOptions: number[] = [];

  public locationsCount = 0;

  public limit = 10;

  private locationsSubscription: Subscription;

  private eventEmitterSubscription: Subscription;

  private pageEvent: PageEvent = null;

  constructor(
    private modal: MatDialog,
    private locationApi: LocationApi,
    private errorMessageService: ErrorMessageService,
  ) { }

  ngOnInit(): void {
    this.loadNewData();

    this.eventEmitterSubscription = this.eventEmitter
      .subscribe((event) => {
          if (event === 'refresh:operation:location:list') {
            this.refreshData();
          }
        }
      );
  }

  ngOnDestroy() {
    if (this.locationsSubscription) {
      this.locationsSubscription.unsubscribe();
    }

    this.eventEmitterSubscription.unsubscribe();
  }

  public openUpdateModal(model: TypeModel): void {
    this.modal
      .open(
        FormComponent,
        {
          minWidth: '320px',
          maxWidth: '640px',
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
    const paginatorData = PaginatorGraphqlService.getAfterBeforeByPageEvent(this.pageEvent, this.locations);

    this.load(paginatorData.after, paginatorData.before);
  }

  private refreshData(): void
  {
    this.locationApi.findAllRefresh();
  }

  private load(after: string|null, before: string|null): void {
    this.loading = true;

    if (this.locationsSubscription instanceof Subscription) {
      console.log('findAll');
      this.locationApi.findAll(this.limit, after, before);
      return;
    }

    this.locationsSubscription = this.locationApi
      .findAll(this.limit, after, before)
      .subscribe(
        (data) => {
          this.locations = data.result;
          this.locationsCount = data.totalCount;

          this.pageSizeOptions = PageSizeOptions.getSizeOptions(this.locationsCount);

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
