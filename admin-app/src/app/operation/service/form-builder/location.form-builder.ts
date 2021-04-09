import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocationModel} from '../../model/location.model';

export class LocationFormBuilder {
  static create(location: LocationModel): FormGroup {
    return new FormGroup({
      name: new FormControl(location.name, [
        Validators.maxLength(256),
      ]),
      id: new FormControl(location.id)
    });
  }
}
