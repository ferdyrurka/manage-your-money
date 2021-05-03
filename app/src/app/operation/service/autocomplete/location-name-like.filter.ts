import {FormArray, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {LocationDto} from '../../dto/location.dto';

export class LocationNameLikeFilter {
  constructor(private readonly options: LocationDto[], private locationsFormGroup: FormArray) {
  }

  public handle(control: FormControl): Observable<LocationDto[]> {
    return control.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  private filter(value: string): LocationDto[] {
    const filterValue = value.toLowerCase();

    return this.getNotUsedLocations()
      .filter((option: LocationDto) => option.name.toLowerCase().indexOf(filterValue) !== -1);
  }

  private getNotUsedLocations(): LocationDto[] {
    const usedLocations = this.locationsFormGroup.controls.map((location) => location.get('name').value);

    return this.options.filter((option: LocationDto) => !usedLocations.includes(option.name));
  }
}
