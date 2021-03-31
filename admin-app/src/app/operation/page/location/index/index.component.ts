import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {FormComponent} from '../../../component/location/form/form.component';

@Component({
  selector: 'app-operation-location-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  @Output() public eventEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private modal: MatDialog,
  ) { }

  public openCreateModal(): void {
    this.modal
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
            this.eventEmitter.emit('refresh:operation:location:list');
          }
        }
      );
  }
}
