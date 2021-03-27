import { NgModule } from '@angular/core';
import { CreateFormComponent } from './component/type/create-form/create-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MyErrorStateMatcher} from '../shared/service/my-error-state.matcher';
import {MatButtonModule} from '@angular/material/button';
import { TypeApi } from './api/type.api';
import { HttpClientModule } from '@angular/common/http';
import { TypeFactory } from './factory/type.factory';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IndexComponent } from './page/type/index/index.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {ErrorMessageService} from '../shared/service/error-message.service';

@NgModule({
  declarations: [
    CreateFormComponent,
    IndexComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [
    MyErrorStateMatcher,
    TypeApi,
    TypeFactory,
    ErrorMessageService,
  ],
  bootstrap: []
})
export class OperationModule { }
