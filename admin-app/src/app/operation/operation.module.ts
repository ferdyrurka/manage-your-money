import {NgModule} from '@angular/core';
import {FormComponent as TypeFormComponent} from './component/type/form/form.component';
import {FormComponent as LocationFormComponent} from './component/location/form/form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MyErrorStateMatcher} from '../shared/service/my-error-state.matcher';
import {MatButtonModule} from '@angular/material/button';
import {TypeApi} from './api/type.api';
import {HttpClientModule} from '@angular/common/http';
import {TypeFactory} from './factory/type.factory';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {IndexComponent as TypeIndexPage} from './page/type/index/index.component';
import {IndexComponent as LocationIndexPage} from './page/location/index/index.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ErrorMessageService} from '../shared/service/error-message.service';
import {ListComponent as TypeListComponent} from './component/type/list/list.component';
import {ListComponent as LocationListComponent} from './component/location/list/list.component';
import {LocationApi} from './api/location.api';
import {LocationFactory} from './factory/location.factory';
import {CategoriesFormComponent as LocationCategoriesFormComponent} from './component/location/categories-form/categories-form.component';
import {SlugsFormComponent} from './component/shared/slugs-form/slugs-form.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CategoryApi} from './api/category.api';
import {SaveErrorService} from '../shared/service/save-error.service';
import {ListComponent as CategoryListComponent} from './component/category/list/list.component';
import {FormComponent as CategoryFormComponent} from './component/category/form/form.component';
import {LocationFormComponent as CategoryLocationFormComponent} from './component/category/location-form/location-form.component';
import {IndexComponent as CategoryIndexPage} from './page/category/index/index.component';
import {CategoryFactory} from './factory/category.factory';
import {SlugFactory} from './factory/slug.factory';

@NgModule({
  declarations: [
    TypeFormComponent,
    LocationFormComponent,
    TypeIndexPage,
    LocationIndexPage,
    TypeListComponent,
    LocationListComponent,
    LocationCategoriesFormComponent,
    SlugsFormComponent,
    CategoryListComponent,
    CategoryFormComponent,
    CategoryIndexPage,
    CategoryLocationFormComponent
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
  ],
  providers: [
    MyErrorStateMatcher,
    TypeApi,
    LocationApi,
    CategoryApi,
    TypeFactory,
    LocationFactory,
    CategoryFactory,
    SlugFactory,
    ErrorMessageService,
    SaveErrorService,
  ],
  bootstrap: []
})
export class OperationModule {
}
