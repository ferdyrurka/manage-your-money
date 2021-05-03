import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {TypeDto} from '../../dto/type.dto';

export class TypeNameLikeFilter {
  constructor(private readonly options: TypeDto[], private typeFormGroup: FormGroup) {
  }

  public handle(control: FormControl): Observable<TypeDto[]> {
    return control.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  private filter(value: string): TypeDto[] {
    const filterValue = value.toLowerCase();

    return this.getNotUsedTypes()
      .filter((option: TypeDto) => option.name.toLowerCase().indexOf(filterValue) !== -1);
  }

  private getNotUsedTypes(): TypeDto[] {
    const usedType = this.typeFormGroup.get('name').value;

    return this.options.filter((option: TypeDto) => usedType !== option.name);
  }
}
