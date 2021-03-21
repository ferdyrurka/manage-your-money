import { NgModule } from '@angular/core';
import { CreateComponent } from './page/type/create/create.component';
import { CreateFormComponent } from './component/type/create-form/create-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MyErrorStateMatcher} from '../shared/service/my-error-state.matcher';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [CreateComponent, CreateFormComponent],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [
    MyErrorStateMatcher,
  ],
  bootstrap: []
})
export class OperationModule { }
