import {Component, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../shared/service/my-error-state.matcher';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogData} from '../../shared/dialog-data';
import {LocationModel} from '../../../model/location.model';
import {LocationApi} from '../../../api/location.api';
import {LocationFactory} from '../../../factory/location.factory';
import {SaveErrorService} from '../../../../shared/service/save-error.service';

@Component({
  selector: 'app-operation-component-location-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output()
  public typeForm: FormGroup;

  public loading = true;

  constructor(
    public matcher: MyErrorStateMatcher,
    @Inject(MAT_DIALOG_DATA) public readonly data: DialogData<LocationModel>,
    private locationApi: LocationApi,
    private locationFactory: LocationFactory,
    private snackBar: MatSnackBar,
    private modelRef: MatDialogRef<FormComponent>,
    private saveErrorService: SaveErrorService,
  ) {
    if (this.data == null) {
      this.data = new DialogData<LocationModel>();
      this.data.model = locationFactory.create();
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

    this.locationFactory.setApiModelFromFormGroup(this.data.model, this.typeForm);

    this.locationApi
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
