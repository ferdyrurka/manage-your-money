import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MyErrorStateMatcher} from '../shared/service/my-error-state.matcher';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ErrorMessageService} from '../shared/service/error-message.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {SaveErrorService} from '../shared/service/save-error.service';
import {IndexComponent} from './page/operation/index/index.component';
import {ImportComponent} from './component/import/import.component';
import {NgxMatFileInputModule} from '@angular-material-components/file-input';
import {OperationApi} from './api/operation.api';
import {OperationFactory} from './factory/operation.factory';

@NgModule({
  declarations: [
    IndexComponent,
    ImportComponent,
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
        MatAutocompleteModule,
        NgxMatFileInputModule,
    ],
  providers: [
    MyErrorStateMatcher,
    ErrorMessageService,
    SaveErrorService,
    OperationApi,
    OperationFactory,
  ],
  bootstrap: []
})
export class OperationModule {
}
