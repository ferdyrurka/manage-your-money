import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PageSizeOptions} from '../../../shared/paginator/page-size-options';
import {Subscription} from 'rxjs';
import {PaginatorGraphqlService} from '../../../shared/service/paginator-graphql.service';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {OperationApi} from '../../api/operation.api';
import {ErrorMessageService} from '../../../shared/service/error-message.service';
import {OperationDto} from '../../dto/operation.dto';
import {FormComponent} from '../form/form.component';
import {OperationFactory} from '../../factory/operation.factory';
import {FilterDto} from '../../dto/filter.dto';

@Component({
  selector: 'app-operation-component-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  @Input() public eventEmitter: EventEmitter<string>;

  @Output() public filterDto: FilterDto = new FilterDto();

  public readonly displayedColumns = [
    'payAt',
    'amount',
    'balanceAfterSurgery',
    'type_name',
    'location_name',
    'description',
    'update_delete',
  ];

  public loading = true;

  public operations: OperationDto[] = [];

  public pageSizeOptions: number[] = [];

  public operationsCount = 0;

  public limit = 10;

  public pageIndex = 0;

  private operationsSubscription: Subscription|null = null;

  private eventEmitterSubscription: Subscription|null = null;

  private pageEvent: PageEvent = null;

  constructor(
    private modal: MatDialog,
    private operationApi: OperationApi,
    private errorMessageService: ErrorMessageService,
    private factory: OperationFactory,
  ) {
  }

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
    this.operationsSubscription?.unsubscribe();
    this.eventEmitterSubscription?.unsubscribe();
  }

  public openUpdateModal(dto: OperationDto): void {
    this.modal
      .open(
        FormComponent,
        {
          minWidth: '320px',
          maxWidth: '640px',
          maxHeight: '99vh',
          width: '100%',
          data: {
            dto,
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
    this.pageIndex = event.pageIndex;
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

  public remove(operation: OperationDto): void
  {
    this.loading = true;

    this.operationApi.remove(
      this.factory.createWriteModelFromDto(operation)
    ).subscribe(
      () => {
        this.refreshData();
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.errorMessageService.show();

        console.error(err);
      }
    );
  }

  public search(): void
  {
    this.loading = true;

    this.operations = [];
    this.pageEvent = null;
    this.operationsCount = 0;
    this.pageIndex = 0;
    this.limit = 10;

    this.loadNewData();
  }

  private loadNewData(): void
  {
    const paginatorData = PaginatorGraphqlService.getAfterAndBeforeByPageEvent(this.pageEvent, this.operations);
    this.load(paginatorData.after, paginatorData.before);
  }

  private refreshData(): void
  {
    this.operationApi.findAllRefresh();
  }

  private load(after: string|null, before: string|null): void {
    this.loading = true;
    this.operationsSubscription?.unsubscribe();

    this.operationsSubscription = this.operationApi
      .findAll(this.limit, after, before, this.filterDto)
      .subscribe(
        (data) => {
          this.operations = data.result;
          this.operationsCount = data.totalCount;

          this.pageSizeOptions = PageSizeOptions.getSizeOptions(this.operationsCount);
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
