import {Component, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../shared/service/my-error-state.matcher';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../../shared/dialog-data';
import {LocationFactory} from '../../../factory/location.factory';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SaveErrorService} from '../../../../shared/service/save-error.service';
import {CategoryModel} from '../../../model/category.model';
import {CategoryApi} from '../../../api/category.api';
import {NullCategoryModel} from '../../../model/null-category.model';
import {CategoryFactory} from '../../../factory/category.factory';

@Component({
  selector: 'app-operation-component-category-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output()
  public typeForm: FormGroup;

  public loading = true;

  constructor(
    public matcher: MyErrorStateMatcher,
    @Inject(MAT_DIALOG_DATA) public readonly data: DialogData<CategoryModel>,
    private categoryApi: CategoryApi,
    private categoryFactory: CategoryFactory,
    private snackBar: MatSnackBar,
    private modelRef: MatDialogRef<FormComponent>,
    private saveErrorService: SaveErrorService,
  ) {
    if (this.data == null) {
      this.data = new DialogData<CategoryModel>();
      this.data.model = new NullCategoryModel();
    }
  }

  ngOnInit(): void {
    this.typeForm = new FormGroup({
      name: new FormControl(this.data.model.name, [
        Validators.required,
        Validators.maxLength(64)
      ]),
    });

    this.loading = false;
  }

  public save(): void {
    this.typeForm.markAllAsTouched();

    if (this.typeForm.invalid) {
      return;
    }

    this.loading = true;

    this.categoryFactory.setApiModelFromFormGroup(this.data.model, this.typeForm);

    this.categoryApi
      .save(this.data.model)
      .subscribe(
        () => {
          setTimeout(() => { this.modelRef.close({successSave: true}); }, 200);
        },
        (err) => {
          this.loading = false;
          this.saveErrorService.catch(err);
        }
      );
  }
}
