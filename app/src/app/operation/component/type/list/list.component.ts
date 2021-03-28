import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {TypeModel} from '../../../model/type.model';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {TypeApi} from '../../../api/type.api';
import {ErrorMessageService} from '../../../../shared/service/error-message.service';
import {FormComponent} from '../form/form.component';

@Component({
  selector: 'app-operation-type-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() public eventEmitter: EventEmitter<string>;

  public readonly displayedColumns = ['id', 'name', 'update'];

  public loading = true;

  public types: TypeModel[] = [];

  public typesCount = 0;

  public limit = 5;

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
    let after: string|null = null;
    let before: string|null = null;

    if (this.pageEvent != null && this.pageEvent.pageIndex > 0) {
      if (this.pageEvent.previousPageIndex < this.pageEvent.pageIndex) {
        after = this.types[this.limit - 1].cursor;
      } else {
        before = this.types[0].cursor;
      }
    }

    this.load(after, before);
  }

  private refreshData(): void
  {
    this.typeApi.findAllRefresh();
  }

  private load(after: string|null, before: string|null): void
  {
    this.loading = true;

    this.typeSubscription = this.typeApi
      .findAll(this.limit, after, before)
      .subscribe(
        (data) => {
          this.types = data.result;
          this.typesCount = data.totalCount;

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
