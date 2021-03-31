import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorMessageService {
  public constructor(
    private snackBar: MatSnackBar
  ) {}

  public showDuplicate(): void
  {
    this.snackBar.open('This entity already exists.', null, {duration: 5000});
  }

  public show(): void
  {
    this.snackBar.open(
      'Something went wrong, please try again in a moment. If the problem persists, contact your IT department.',
      null,
      {
        duration: 10000,
      }
    );
  }
}
