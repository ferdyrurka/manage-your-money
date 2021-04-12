import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../shared/service/my-error-state.matcher';
import {TypeApi} from '../../../api/type.api';
import {TypeFactory} from '../../../factory/type.factory';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TypeModel} from '../../../model/type.model';
import {DialogData} from '../../shared/dialog-data';
import {SlugFormBuilder} from '../../../service/form-builder/slug.form-builder';
import {SaveErrorService} from '../../../../shared/service/save-error.service';

@Component({
  selector: 'app-operation-component-type-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public typeForm: FormGroup;

  public loading = true;

  constructor(
    public matcher: MyErrorStateMatcher,
    @Inject(MAT_DIALOG_DATA) public readonly data: DialogData<TypeModel>,
    private typeApi: TypeApi,
    private typeFactory: TypeFactory,
    private snackBar: MatSnackBar,
    private modelRef: MatDialogRef<FormComponent>,
    private saveErrorService: SaveErrorService,
  ) {
    if (this.data == null) {
      this.data = new DialogData<TypeModel>();
      this.data.model = typeFactory.create();
    }
  }

  ngOnInit(): void {
    this.typeForm = new FormGroup({
      name: new FormControl(this.data.model.name, [
        Validators.required,
        Validators.maxLength(64)
      ]),
      slugs: new FormArray([], []),
    });

    this.data.model.slugs.forEach((slug: { slug: string }) => this.addItem(slug.slug));

    this.loading = false;
  }

  public addItem(slug: string = ''): void {
    const items: FormArray = this.typeForm.get('slugs') as FormArray;

    items.markAllAsTouched();

    if (items.valid) {
      items.push(SlugFormBuilder.create(slug));
    }
  }

  public removeItem(item: number): void {
    const items: FormArray = this.typeForm.get('slugs') as FormArray;

    if (items.length > 1) {
      items.removeAt(item);
    }
  }

  public save(): void {
    this.typeForm.markAllAsTouched();

    if (this.typeForm.invalid) {
      return;
    }

    this.typeFactory.setFromFormGroup(this.data.model, this.typeForm);

    this.loading = true;

    this.typeApi.save(this.data.model).subscribe(
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
