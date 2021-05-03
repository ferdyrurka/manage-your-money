import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {LocationDto} from '../../dto/location.dto';

export class LocationNameLikeFilter {
  constructor(private readonly options: LocationDto[], private locationFormGroup: FormGroup) {
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
    const usedLocation = this.locationFormGroup.get('name').value;

    return this.options.filter((option: LocationDto) => usedLocation !== option.name);
  }
}
