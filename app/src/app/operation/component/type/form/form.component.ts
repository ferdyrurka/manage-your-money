import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../shared/service/my-error-state.matcher';
import {TypeApi} from '../../../api/type.api';
import {TypeFactory} from '../../../factory/type.factory';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ErrorMessageService} from '../../../../shared/service/error-message.service';
import {TypeModel} from '../../../model/type.model';
import {NullTypeModel} from '../../../model/null-type.model';

class DialogData {
  public model: TypeModel | null = null;
}

@Component({
  selector: 'app-type-component-create-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  public typeForm: FormGroup;

  public loading = true;

  private saveSubscriber: Subscription;

  constructor(
    public matcher: MyErrorStateMatcher,
    private typeApi: TypeApi,
    private typeFactory: TypeFactory,
    private snackBar: MatSnackBar,
    private modelRef: MatDialogRef<FormComponent>,
    private errorMessageService: ErrorMessageService,
    @Inject(MAT_DIALOG_DATA) private readonly data: DialogData,
  ) {
    if (this.data == null) {
      this.data = new DialogData();
      this.data.model = new NullTypeModel();
    }
  }

  ngOnInit(): void {
    this.typeForm = new FormGroup({
      name: new FormControl(this.data.model.name, [
        Validators.required,
        Validators.maxLength(64)
      ]),
      slugs: new FormArray(
        [], []
      ),
    });

    this.data.model.slugs.forEach((slug: any) => {
      this.addItem(slug.slug);
    });

    this.loading = false;
  }

  ngOnDestroy(): void {
    if (this.saveSubscriber) {
      this.saveSubscriber.unsubscribe();
    }
  }

  public addItem(slug: string = ''): void {
    const items: FormArray = this.typeForm.get('slugs') as FormArray;

    items.markAllAsTouched();

    if (items.valid) {
      items.push(this.createItem(slug));
    }
  }

  public save(): void {
    this.typeForm.markAllAsTouched();

    if (this.typeForm.invalid) {
      return;
    }

    this.typeFactory.setFromFormGroup(this.data.model, this.typeForm);

    this.loading = true;

    this.saveSubscriber = this.typeApi.save(this.data.model).subscribe(
      () => {
        setTimeout(() => { this.modelRef.close({successSave: true}); }, 200);
      },
      (err) => {
        console.error(err);
        this.loading = false;

        if (err.status === 422) {
          this.errorMessageService.showDuplicate();
          return;
        }

        this.errorMessageService.show();
      }
    );
  }

  private createItem(slug: string): FormGroup {
    return new FormGroup({
      slug: new FormControl(slug, [
        Validators.required,
        Validators.maxLength(256),
      ])
    });
  }
}
