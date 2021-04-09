import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {LocationModel} from '../model/location.model';

@Injectable()
export class LocationFactory {
  public setApiModelFromFormGroup(model: LocationModel, form: FormGroup): void {
    model.name = form.get('name')?.value;
    model.slugs = form.get('slugs')?.value;
    model.operationCategories = [];

    const categories = form.get('categories')?.value;

    if (categories.length > 0) {
      categories.forEach((category: { name: string, id: string }) => {
        if (category.id) {
          model.operationCategories.push(category.id);
        }
      });
    }
  }
}
