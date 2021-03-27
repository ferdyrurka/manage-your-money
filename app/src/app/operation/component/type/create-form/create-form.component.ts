import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../../shared/service/my-error-state.matcher';
import { TypeApi } from '../../../api/type.api';
import { TypeFactory } from '../../../factory/type.factory';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';
import {ErrorMessageService} from '../../../../shared/service/error-message.service';

@Component({
  selector: 'app-type-component-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit, OnDestroy {

  public typeForm: FormGroup;

  public loading = false;

  private saveSubscriber: Subscription;

  constructor(
    public matcher: MyErrorStateMatcher,
    private typeApi: TypeApi,
    private typeFactory: TypeFactory,
    private snackBar: MatSnackBar,
    private modelRef: MatDialogRef<CreateFormComponent>,
    private errorMessageService: ErrorMessageService,
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

  ngOnDestroy(): void {
    if (this.saveSubscriber) {
      this.saveSubscriber.unsubscribe();
    }
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

      this.saveSubscriber = this.typeApi.save(type).subscribe(
        () => {
          this.snackBar.open(
            'You have created the operation type correctly.',
            null,
            {duration: 5000,}
          );

          setTimeout(
            () => { this.modelRef.close(); }, 200
          );
        },
        (err) => {
          this.loading = false;

          if (err.status === 422) {
            this.snackBar.open('This type of operation already exists.', null, { duration: 5000 });

            return;
          }

          console.error(err);

          this.errorMessageService.show();
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
