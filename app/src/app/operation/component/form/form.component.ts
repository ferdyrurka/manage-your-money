import {Component, Inject, OnInit, Output} from '@angular/core';
import {MyErrorStateMatcher} from '../../../shared/service/my-error-state.matcher';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OperationDto} from '../../dto/operation.dto';
import {DialogDataDto} from '../../dto/dialog-data.dto';
import {OperationApi} from '../../api/operation.api';
import {OperationFactory} from '../../factory/operation.factory';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SaveErrorService} from '../../../shared/service/save-error.service';
import {PayAtFilter} from '../../service/filter/pay-at.filter';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output()
  public form: FormGroup;

  public loading = true;

  constructor(
    public matcher: MyErrorStateMatcher,
    public payAtFilter: PayAtFilter,
    @Inject(MAT_DIALOG_DATA) public readonly data: DialogDataDto<OperationDto>,
    private api: OperationApi,
    private factory: OperationFactory,
    private snackBar: MatSnackBar,
    private modelRef: MatDialogRef<FormComponent>,
    private saveErrorService: SaveErrorService,
  ) {
    if (this.data == null) {
      this.data = new DialogDataDto<OperationDto>();
      this.data.dto = factory.create();
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      payAt: new FormControl(this.data.dto.payAt, [
        Validators.required,
      ]),
      amount: new FormControl(this.data.dto.amount, [
        Validators.required,
      ]),
      balanceAfterSurgery: new FormControl(this.data.dto.balanceAfterSurgery, [
        Validators.required,
      ]),
    });

    this.loading = false;
  }

  public save(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const operation = this.factory.createWriteModel(this.data.dto.id, this.form);

    this.api
      .save(operation)
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
