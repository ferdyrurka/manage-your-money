import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { FormComponent} from '../../../component/type/form/form.component';
import { TypeApi} from '../../../api/type.api';
import { TypeModel} from '../../../model/type.model';
import { Subscription } from 'rxjs';
import { ErrorMessageService } from '../../../../shared/service/error-message.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-operation-type-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  public readonly displayedColumns = ['id', 'name', 'update'];

  public loading = true;

  public types: TypeModel[] = [];

  public typesCount = 0;

  public limit = 5;

  private typeSubscription: Subscription;

  private pageEvent: PageEvent = null;

  constructor(
    private modal: MatDialog,
    private typeApi: TypeApi,
    private errorMessageService: ErrorMessageService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy() {
    this.typeSubscription.unsubscribe();
  }

  pageHandle(event: PageEvent): void {
    this.pageEvent = event;

    console.log(this.pageEvent);

    if (this.limit !== this.pageEvent.pageSize) {
      this.limit = this.pageEvent.pageSize;
      this.loadData();
      return;
    }

    if (this.pageEvent.previousPageIndex !== this.pageEvent.pageIndex) {
      this.loadData();
    }
  }

  public openCreateModal(): void {
    this.modal.open(
      FormComponent,
      {
        minWidth: '320px',
        maxWidth: '640px',
        width: '100%',
      }
    );
  }

  public openUpdateModal(model: TypeModel): void {
    this.modal.open(
      FormComponent,
      {
        minWidth: '320px',
        maxWidth: '640px',
        width: '100%',
        data: {
          model,
        },
      }
    );
  }

  private loadData(): void
  {
    this.loading = true;

    let after: string|null = null;
    let before: string|null = null;

    if (this.pageEvent != null && this.pageEvent.pageIndex > 0) {
      if (this.pageEvent.previousPageIndex < this.pageEvent.pageIndex) {
        after = this.types[this.limit - 1].cursor;
      } else {
        before = this.types[0].cursor;
      }
    }

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
