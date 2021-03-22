import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../../shared/service/my-error-state.matcher';
import { TypeApi } from '../../../api/type.api';
import { TypeFactory } from '../../../factory/type.factory';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-type-component-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  public typeForm: FormGroup;

  public loading = false;

  constructor(
    public matcher: MyErrorStateMatcher,
    private typeApi: TypeApi,
    private typeFactory: TypeFactory,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.typeForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(64)
      ]),
      slugs: new FormArray(
        [this.createItem()], []
      ),
    });
  }

  public addItem(): void {
    const items: FormArray = this.typeForm.get('slugs') as FormArray;

    items.markAllAsTouched();

    if (items.valid) {
      items.push(this.createItem());
    }
  }

  public save(): void {
    this.typeForm.markAllAsTouched();

    if (this.typeForm.valid) {
      const type = this.typeFactory.createFromFormGroup(this.typeForm);

      this.loading = true;

      this.typeApi.save(type).subscribe(
        () => {
          setTimeout(() => {this.loading = false; }, 2000);

          this.typeForm.reset();

          this.snackBar.open(
            'You have created the operation type correctly.',
            null,
            {
              duration: 5000,
            }
          );
        },
        (err) => {
          this.loading = false;

          if (err.status === 422) {
            this.snackBar.open(
              'This type of operation already exists.',
              null,
              {
                duration: 5000,
              }
            );

            return;
          }

          console.error(err);

          this.snackBar.open(
            'Something went wrong, please try again in a moment. If the problem persists, contact your IT department.',
            null,
            {
              duration: 10000,
            }
          );
        }
      );
    }
  }

  private createItem(): FormGroup {
    return new FormGroup({
      slug: new FormControl('', [
        Validators.required,
        Validators.maxLength(256),
      ])
    });
  }
}
