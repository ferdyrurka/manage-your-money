import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {LocationApi} from '../../api/location.api';
import {MyErrorStateMatcher} from '../../../shared/service/my-error-state.matcher';
import {LocationDto} from '../../dto/location.dto';
import {LocationNameLikeFilter} from '../../service/autocomplete/location-name-like.filter';
import {OperationDto} from '../../dto/operation.dto';
import {ErrorMessageService} from '../../../shared/service/error-message.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-operation-component-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {
  @Input() form: FormGroup;

  @Input() dto: OperationDto;

  public filteredOptions: Observable<LocationDto[]>;

  private locationNameLikeFilter: LocationNameLikeFilter;

  constructor(
    public matcher: MyErrorStateMatcher,
    private api: LocationApi,
    private errorMessageService: ErrorMessageService,
  ) {
  }

  ngOnInit(): void {
    this.form.addControl(
      'location',
      new FormGroup({
        name: new FormControl(this.dto.location?.name),
        id: new FormControl(this.dto.location?.id)
      })
    );

    this.api
      .findAllBasicData()
      .subscribe(
        (data) => {
          this.locationNameLikeFilter = new LocationNameLikeFilter(
            data.result,
            this.form.get('location') as FormGroup,
          );

          if (this.dto.location !== null) {
            this.form.get('location').get('name').setValue(this.dto.location.name);
            this.form.get('location').get('id').setValue(this.dto.location.id);
          }

          this.filteredOptions = this.locationNameLikeFilter
            .handle(this.form.get('location').get('name') as FormControl);
        },
        (err) => {
          this.errorMessageService.show();
          console.error(err);
        },
      );
  }

}
