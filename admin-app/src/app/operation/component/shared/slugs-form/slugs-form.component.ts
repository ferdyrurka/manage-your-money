import {Component, Input, OnInit} from '@angular/core';
import {SlugFormBuilder} from '../../../service/form-builder/slug.form-builder';
import {LocationModel} from '../../../model/location.model';
import {FormArray, FormGroup} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../shared/service/my-error-state.matcher';

@Component({
  selector: 'app-operation-component-shared-slugs-form',
  templateUrl: './slugs-form.component.html',
  styleUrls: ['./slugs-form.component.scss']
})
export class SlugsFormComponent implements OnInit {
  @Input()
  public model: LocationModel;

  @Input()
  public form: FormGroup;

  constructor(
    public matcher: MyErrorStateMatcher,
  ) { }

  ngOnInit(): void {
    this.form.addControl('slugs', new FormArray([], []));

    this.model.slugs.forEach((slug: string) => {
      this.addItem(slug);
    });
  }

  public addItem(slug: string = ''): void {
    const items = this.getItems('slugs');

    if (items.valid) {
      items.push(SlugFormBuilder.create(slug));
    }
  }

  public removeItem(item: number, name: string): void {
    const items = this.getItems(name);

    if (items.length > 1) {
      items.removeAt(item);
    }
  }

  private getItems(name: string): FormArray {
    const items: FormArray = this.form.get(name) as FormArray;
    items.markAllAsTouched();

    return items;
  }
}
