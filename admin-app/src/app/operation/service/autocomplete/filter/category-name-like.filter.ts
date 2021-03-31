import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {CategoryModel} from '../../../model/category.model';

export class CategoryNameLikeFilter {
  constructor(private readonly options: CategoryModel[], private categoriesFormGroup: FormArray) {
  }

  public handle(control: FormControl): Observable<CategoryModel[]> {
    return control.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  private filter(value: string): CategoryModel[] {
    const filterValue = value.toLowerCase();

    return this.getNotUsedCategories()
      .filter((option: CategoryModel) => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private getNotUsedCategories(): CategoryModel[] {
    const usedCategories = this.categoriesFormGroup.controls.map((category) => category.get('name').value);

    return this.options.filter((option: CategoryModel) => !usedCategories.includes(option.name));
  }
}
