import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {LocationModel} from '../model/location.model';

@Injectable()
export class LocationFactory {
  public setApiModelFromFormGroup(type: LocationModel, form: FormGroup): void {
    type.name = form.get('name')?.value;
    type.slugs = form.get('slugs')?.value;
    type.operationCategories = [];

    const categories = form.get('categories')?.value;

    if (categories.length > 0) {
      categories.forEach((category: { name: string, id: string }) => {
        type.operationCategories.push(category.id);
      });
    }
  }
}
