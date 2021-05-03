import {Component, EventEmitter, Output} from '@angular/core';
import {ImportComponent} from '../../../component/import/import.component';
import {MatDialog} from '@angular/material/dialog';
import {FormComponent} from '../../../component/form/form.component';

@Component({
  selector: 'app-operation-index',
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
          maxHeight: '99vh',
          width: '100%',
        }
      )
      .afterClosed()
      .subscribe(
        (event) => {
          if (event && event.successSave) {
            this.eventEmitter.emit('refresh:operation:list');
          }
        }
      );
  }

  public openImportModal(): void {
    this.modal
      .open(
        ImportComponent,
        {
          minWidth: '320px',
          maxWidth: '640px',
          maxHeight: '99vh',
          width: '100%',
        }
      );
  }
}
