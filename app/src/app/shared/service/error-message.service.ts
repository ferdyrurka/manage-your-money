import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {environment} from '../../../environments/environment';

@Injectable()
export class ErrorMessageService {
  public constructor(
    private snackBar: MatSnackBar
  ) {}

  public showDuplicate(): void
  {
    this.snackBar.open('This entity already exists.', null, {duration: 5000});
  }

  public showBadRequest(message: string|null): void
  {
    this.snackBar.open(message !== null ? 'Send bad data. ' + message : 'Send bad data.', null, {duration: 5000});
  }

  public show(): void
  {
    this.snackBar.open(
      'Something went wrong, please try again in a moment. If the problem persists, please a send email to ' + environment.devsEmail,
      null,
      {
        duration: 10000,
      }
    );
  }
}
