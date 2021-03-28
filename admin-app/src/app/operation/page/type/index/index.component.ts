import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { FormComponent} from '../../../component/type/form/form.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-operation-type-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnDestroy {
  @Output() public eventEmitter: EventEmitter<string> = new EventEmitter<string>();

  private modalSubscription: Subscription;

  constructor(
    private modal: MatDialog,
  ) { }

  ngOnDestroy() {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }

  public openCreateModal(): void {
    this.modalSubscription = this.modal
      .open(
        FormComponent,
        {
          minWidth: '320px',
          maxWidth: '640px',
          width: '100%',
        }
      )
      .afterClosed()
      .subscribe(
        (event) => {
          if (event && event.successSave) {
            this.eventEmitter.emit('refresh:operation:type:list');
          }
        }
      );
  }
}
