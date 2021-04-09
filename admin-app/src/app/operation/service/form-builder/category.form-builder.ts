import {CategoryModel} from '../../model/category.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export class CategoryFormBuilder {
  static create(category: CategoryModel): FormGroup {
    return new FormGroup({
      name: new FormControl(category.name, [
        Validators.maxLength(256),
      ]),
      id: new FormControl(category.id)
    });
  }
}
