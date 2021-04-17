import {FormControl, ValidationErrors} from '@angular/forms';

const MAX_FILE_SIZE_BYTES = 18874368;

export class ImportFileValidator {

  public static fileExtension(control: FormControl): ValidationErrors | null {
    const file = control.value as File;

    return (file.type === 'text/csv') ? null : {fileExtension: true};
  }

  public static fileSize(control: FormControl): ValidationErrors | null {
    const file = control.value as File;

    return (file.size <= MAX_FILE_SIZE_BYTES) ? null : {fileSize: true};
  }
}
