import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';

@Injectable()
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
