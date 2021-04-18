import {ErrorMessageService} from './error-message.service';
import {Injectable} from '@angular/core';

@Injectable()
export class SaveErrorService {
  constructor(private errorMessageService: ErrorMessageService) {
  }

  public catch(err: any): void {
    if (err.status === 422) {
      this.errorMessageService.showDuplicate();
      return;
    }

    if (err.status === 400) {
      this.errorMessageService.showBadRequest(err.error.message);
      return;
    }

    this.errorMessageService.show();
  }
}
