import {Component} from '@angular/core';
import {ImportComponent} from '../../../component/import/import.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-operation-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  constructor(
    private modal: MatDialog,
  ) { }

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
