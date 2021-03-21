import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeModel } from '../../../model/type.model';
import { MyErrorStateMatcher } from '../../../../shared/service/my-error-state.matcher';

@Component({
  selector: 'app-type-component-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  public typeForm: FormGroup;

  private type: TypeModel;

  constructor(public matcher: MyErrorStateMatcher) {
    this.type = new TypeModel();
  }

  ngOnInit(): void {
    this.typeForm = new FormGroup({
      name: new FormControl(this.type.name, [
        Validators.required,
        Validators.maxLength(64)
      ]),
    });
  }

  public save(): void {}
}
