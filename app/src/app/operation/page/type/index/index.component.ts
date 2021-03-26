import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CreateFormComponent} from '../../../component/type/create-form/create-form.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private modal: MatDialog) { }

  ngOnInit(): void {
  }

  openCreateModal(): void {
    this.modal.open(
      CreateFormComponent,
      {
        minWidth: '320px',
        maxWidth: '640px',
        width: '100%',
      }
    );
  }
}
