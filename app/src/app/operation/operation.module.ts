import { NgModule } from '@angular/core';
import { CreateComponent } from './page/type/create/create.component';
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
import { IndexComponent } from './component/type/index/index.component';

@NgModule({
  declarations: [CreateComponent, CreateFormComponent, IndexComponent],
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
  ],
  providers: [
    MyErrorStateMatcher,
    TypeApi,
    TypeFactory,
  ],
  bootstrap: []
})
export class OperationModule { }
