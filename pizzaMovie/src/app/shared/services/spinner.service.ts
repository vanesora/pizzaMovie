import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { LoadingComponent } from '../components/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LoadingComponent>
    ) { }

  openAlertDialog() {
    this.dialogRef = this.dialog.open(LoadingComponent, {
      data: {
        message: 'HelloWorld',
        buttonText: {
          cancel: 'Done'
        }
      },
      disableClose: true
    });
  }

  close(): void {
    this.dialogRef.close(true);
  }
}
