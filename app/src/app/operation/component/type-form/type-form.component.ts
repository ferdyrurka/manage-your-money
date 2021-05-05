import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {OperationDto} from '../../dto/operation.dto';
import {Observable} from 'rxjs';
import {TypeDto} from '../../dto/type.dto';
import {TypeNameLikeFilter} from '../../service/autocomplete/type-name-like.filter';
import {MyErrorStateMatcher} from '../../../shared/service/my-error-state.matcher';
import {TypeApi} from '../../api/type.api';
import {ErrorMessageService} from '../../../shared/service/error-message.service';

@Component({
  selector: 'app-operation-component-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.scss']
})
export class TypeFormComponent implements OnInit {
  @Input() form: FormGroup;

  @Input() dto: OperationDto;

  public filteredOptions: Observable<TypeDto[]>;

  private typeNameLikeFilter: TypeNameLikeFilter;

  constructor(
    public matcher: MyErrorStateMatcher,
    private api: TypeApi,
    private errorMessageService: ErrorMessageService,
  ) {
  }

  ngOnInit(): void {
    this.form.addControl(
      'type',
      new FormGroup({
        name: new FormControl(this.dto.type?.name),
        id: new FormControl(this.dto.type?.id)
      })
    );

    this.api
      .findAllBasicData()
      .subscribe(
        (data) => {
          this.typeNameLikeFilter = new TypeNameLikeFilter(
            data.result,
            this.form.get('type') as FormGroup,
          );

          if (this.dto.type !== null) {
            this.form.get('type').get('name').setValue(this.dto.type.name);
            this.form.get('type').get('id').setValue(this.dto.type.id);
          }

          this.filteredOptions = this.typeNameLikeFilter
            .handle(this.form.get('type').get('name') as FormControl);
        },
        (err) => {
          this.errorMessageService.show();
          console.error(err);
        },
      );
  }
}
