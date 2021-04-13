import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';

export class SlugFormBuilder {
  static create(slug: string): FormGroup {
    return new FormGroup({
      slug: new FormControl(slug, [
        Validators.required,
        Validators.maxLength(256),
        RxwebValidators.unique()
      ])
    });
  }
}
