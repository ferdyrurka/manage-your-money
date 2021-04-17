import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../shared/service/my-error-state.matcher';
import {ImportFileValidator} from '../../validator/import-file.validator';
import {OperationApi} from '../../api/operation.api';
import {OperationFactory} from '../../factory/operation.factory';
import {MatDialogRef} from '@angular/material/dialog';
import {SaveErrorService} from '../../../shared/service/save-error.service';

@Component({
  selector: 'app-operation-component-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  public loading = false;

  public form: FormGroup;

  constructor(
    public matcher: MyErrorStateMatcher,
    public api: OperationApi,
    public factory: OperationFactory,
    private modelRef: MatDialogRef<ImportComponent>,
    private saveErrorService: SaveErrorService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      file: new FormControl('', [Validators.required, ImportFileValidator.fileExtension, ImportFileValidator.fileSize]),
    });
  }

  public import(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.api
      .import(
        this.factory.createForImport(this.form)
      )
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
