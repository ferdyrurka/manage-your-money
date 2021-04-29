import {FormArray, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {LocationModel} from '../../../model/location.model';

export class LocationNameLikeFilter {
  constructor(private readonly options: LocationModel[], private locationsFormGroup: FormArray) {
  }

  public handle(control: FormControl): Observable<LocationModel[]> {
    return control.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  private filter(value: string): LocationModel[] {
    const filterValue = value.toLowerCase();

    return this.getNotUsedLocations()
      .filter((option: LocationModel) => option.name.toLowerCase().indexOf(filterValue) !== -1);
  }

  private getNotUsedLocations(): LocationModel[] {
    const usedLocations = this.locationsFormGroup.controls.map((location) => location.get('name').value);

    return this.options.filter((option: LocationModel) => !usedLocations.includes(option.name));
  }
}
