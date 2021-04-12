import {ErrorMessageService} from './error-message.service';
import {Injectable} from '@angular/core';

@Injectable()
export class SaveErrorService {
  constructor(private errorMessageService: ErrorMessageService) {
  }

  public catch(err): void {
    if (err.status === 422) {
      this.errorMessageService.showDuplicate();
      return;
    }

    console.error(err);
    this.errorMessageService.show();
  }
}
