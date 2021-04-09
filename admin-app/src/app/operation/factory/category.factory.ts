import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CategoryModel} from '../model/category.model';

@Injectable()
export class CategoryFactory {
  public setApiModelFromFormGroup(model: CategoryModel, form: FormGroup): void {
    model.name = form.get('name')?.value;
    model.locations = [];

    const locations = form.get('locations')?.value;

    if (locations.length > 0) {
      locations.forEach((location: { name: string, id: string }) => {
        if (location.id) {
          model.locations.push(location.id);
        }
      });
    }
  }
}
