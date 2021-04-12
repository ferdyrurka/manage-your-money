import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CategoryModel} from '../model/category.model';
import {LocationModel} from '../model/location.model';

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

  public create(): CategoryModel {
    const category = new CategoryModel();
    category.name = '';
    category.locations = [];

    return category;
  }

  public findAllToResultModels(edges: []): CategoryModel[] {
    const result: CategoryModel[] = [];

    edges.forEach((category: any) => {
      const model = new CategoryModel();

      model.id = category.node.id;
      model.name = category.node.name;
      model.cursor = category?.cursor;
      model.locationsModelsCollection = [];

      if (category.node.locations) {
        category.node.locations.edges.forEach((location: any) => {
          const locationModel = new LocationModel();

          locationModel.id = location.node.id;
          locationModel.name = location.node.name;

          model.locationsModelsCollection.push(locationModel);
        });
      }

      result.push(model);
    });

    return result;
  }
}
