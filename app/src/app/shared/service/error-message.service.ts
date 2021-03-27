import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorMessageService {
  public constructor(
    private snackBar: MatSnackBar
  ) {}

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
