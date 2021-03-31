import {FormControl, FormGroup, Validators} from '@angular/forms';

export class SlugFormBuilder {
  static create(slug: string): FormGroup {
    return new FormGroup({
      slug: new FormControl(slug, [
        Validators.required,
        Validators.maxLength(256),
      ])
    });
  }
}
