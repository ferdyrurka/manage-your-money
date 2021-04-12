import {Component, Input, OnInit} from '@angular/core';
import {LocationModel} from '../../../model/location.model';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {CategoryModel} from '../../../model/category.model';
import {CategoryFormBuilder} from '../../../service/form-builder/category.form-builder';
import {MyErrorStateMatcher} from '../../../../shared/service/my-error-state.matcher';
import {CategoryApi} from '../../../api/category.api';
import {CategoryNameLikeFilter} from '../../../service/autocomplete/filter/category-name-like.filter';
import {Observable, Subscription} from 'rxjs';
import {ErrorMessageService} from '../../../../shared/service/error-message.service';
import {CategoryFactory} from '../../../factory/category.factory';

@Component({
  selector: 'app-operation-component-location-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  @Input()
  public model: LocationModel;

  @Input()
  public form: FormGroup;

  public filteredOptions: Observable<CategoryModel[]>[] = [];

  private categoryNameLikeFilter: CategoryNameLikeFilter;

  private categories: CategoryModel[];

  constructor(
    public matcher: MyErrorStateMatcher,
    private categoryApi: CategoryApi,
    private categoryFactory: CategoryFactory,
    private errorMessageService: ErrorMessageService,
  ) { }

  ngOnInit(): void {
    this.form.addControl('categories', new FormArray([], []));

    this.categoryApi
      .findAllBasicData()
      .subscribe(
        (data) => {
          this.categories = data.result;

          this.categoryNameLikeFilter = new CategoryNameLikeFilter(
            this.categories,
            this.form.get('categories') as FormArray,
          );

          if (this.model.categoriesModelsCollection.length > 0) {
            this.model.categoriesModelsCollection.forEach((category: CategoryModel) => this.addItem(category));
          } else {
            this.addItem();
          }
        },
        (err) => {
          this.errorMessageService.show();
          console.error(err);
        },
      );
  }

  public addItem(category: CategoryModel|null = null): void {
    const items = this.getItems('categories');

    if (items.invalid) {
      return;
    }

    if (!category) {
      category = this.categoryFactory.create();
    }

    const form = CategoryFormBuilder.create(category);

    this.filteredOptions.push(
      this.categoryNameLikeFilter.handle(form.get('name') as FormControl)
    );

    items.push(form);
  }

  public removeItem(item: number, name: string): void {
    const items = this.getItems(name);

    if (items.length > 1) {
      items.removeAt(item);
      return;
    }

    items.removeAt(item);
    this.addItem(null);
  }

  private getItems(name: string): FormArray {
    const items: FormArray = this.form.get(name) as FormArray;
    items.markAllAsTouched();

    return items;
  }
}
