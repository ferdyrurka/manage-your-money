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
import {ShortGraphComponent} from './page/short-graph/short-graph.component';
import {TypeComponent as GraphTypeComponent} from './component/short-graph/type/type.component';
import {GeneralComponent as GraphGeneralComponent} from './component/short-graph/general/general.component';
import {DataForGraphFactory} from './factory/data-for-graph.factory';
import {ChartsModule} from 'ng2-charts';
import {DataForGraphService} from './service/data-for-graph.service';
import {CategoryComponent as GraphCategoryComponent} from './component/short-graph/category/category.component';
import { ListComponent } from './component/list/list.component';
import { FormComponent } from './component/form/form.component';
import { LocationFormComponent } from './component/location-form/location-form.component';
import { TypeFormComponent } from './component/type-form/type-form.component';

@NgModule({
  declarations: [
    IndexComponent,
    ImportComponent,
    ShortGraphComponent,
    GraphTypeComponent,
    GraphGeneralComponent,
    GraphCategoryComponent,
    ListComponent,
    FormComponent,
    LocationFormComponent,
    TypeFormComponent,
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
    ChartsModule,
  ],
  providers: [
    MyErrorStateMatcher,
    ErrorMessageService,
    SaveErrorService,
    OperationApi,
    OperationFactory,
    DataForGraphFactory,
    DataForGraphService,
  ],
  bootstrap: []
})
export class OperationModule {
}
