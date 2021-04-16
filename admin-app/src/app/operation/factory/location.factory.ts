import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {LocationModel} from '../model/location.model';
import {CategoryModel} from '../model/category.model';
import {SlugFactory} from './slug.factory';

@Injectable()
export class LocationFactory {
  public constructor(private slugFactory: SlugFactory) {
  }

  public setApiModelFromFormGroup(model: LocationModel, form: FormGroup): void {
    model.name = form.get('name')?.value;
    model.operationCategories = [];
    model.slugs = this.slugFactory.getParsedSlugs(form.get('slugs')?.value);

    const categories = form.get('categories')?.value;

    if (categories.length > 0) {
      categories.forEach((category: { name: string, id: string }) => {
        if (category.id) {
          model.operationCategories.push(category.id);
        }
      });
    }
  }

  public create(): LocationModel
  {
    const location = new LocationModel();
    location.name = '';
    location.slugs = [''];
    location.categoriesModelsCollection = [];

    return location;
  }

  public findAllToResultModels(edges: []): LocationModel[] {
    const result: LocationModel[] = [];

    edges.forEach((location: any) => {
      const model = new LocationModel();

      model.id = location.node.id;
      model.name = location.node.name;
      model.slugs = location.node.slugs;
      model.cursor = location.cursor;
      model.categoriesModelsCollection = [];

      if (location.node.operationCategories) {
        location.node.operationCategories.edges.forEach((category: any) => {
          const categoryModel = new CategoryModel();

          categoryModel.id = category.node.id;
          categoryModel.name = category.node.name;

          model.categoriesModelsCollection.push(categoryModel);
        });
      }

      result.push(model);
    });

    return result;
  }
}
