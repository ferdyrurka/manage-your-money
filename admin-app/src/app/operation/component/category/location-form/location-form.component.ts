import {Component, Input, OnInit} from '@angular/core';
import {LocationModel} from '../../../model/location.model';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {CategoryModel} from '../../../model/category.model';
import {MyErrorStateMatcher} from '../../../../shared/service/my-error-state.matcher';
import {ErrorMessageService} from '../../../../shared/service/error-message.service';
import {LocationApi} from '../../../api/location.api';
import {LocationFormBuilder} from '../../../service/form-builder/location.form-builder';
import {LocationNameLikeFilter} from '../../../service/autocomplete/filter/location-name-like.filter';
import {NullLocationModel} from '../../../model/null-location.model';

@Component({
  selector: 'app-operation-component-category-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {
  @Input()
  public model: CategoryModel;

  @Input()
  public form: FormGroup;

  public filteredOptions: Observable<LocationModel[]>[] = [];

  private locationNameLikeFilter: LocationNameLikeFilter;

  private locations: LocationModel[];

  constructor(
    public matcher: MyErrorStateMatcher,
    private locationApi: LocationApi,
    private errorMessageService: ErrorMessageService,
  ) { }

  ngOnInit(): void {
    this.form.addControl('locations', new FormArray([], []));

    this.locationApi
      .findAllBasicData()
      .subscribe(
        (data) => {
          this.locations = data.result;

          this.locationNameLikeFilter = new LocationNameLikeFilter(
            this.locations,
            this.form.get('locations') as FormArray,
          );

          if (this.model.locationsModelsCollection.length > 0) {
            this.model.locationsModelsCollection.forEach((location: LocationModel) => this.addItem(location));
          } else {
            this.addItem();
          }
        },
        (err) => {
          this.errorMessageService.show();
          console.error(err);
        },
      );
  }

  public addItem(location: LocationModel|null = null): void {
    const items = this.getItems('locations');

    if (!location) {
      location = new NullLocationModel();
    }

    if (items.valid) {
      const form = LocationFormBuilder.create(location);

      this.filteredOptions.push(
        this.locationNameLikeFilter.handle(form.get('name') as FormControl)
      );

      items.push(form);
    }
  }

  public removeItem(item: number, name: string): void {
    const items = this.getItems(name);

    if (items.length > 1) {
      items.removeAt(item);
      return;
    }

    items.removeAt(item);
    this.addItem(null);
  }

  private getItems(name: string): FormArray {
    const items: FormArray = this.form.get(name) as FormArray;
    items.markAllAsTouched();

    return items;
  }
}
