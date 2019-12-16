import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { PayComponent } from '../components/pay/pay.component';

@Injectable({
  providedIn: 'root'
})
export class PopupPayService {

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<PayComponent>
  ) { }

  openAlertDialog() {
    this.dialogRef = this.dialog.open(PayComponent, {
      data: {
        message: 'HelloWorld',
        buttonText: {
          cancel: 'Done'
        }
      },
      disableClose: false
    });
  }

  close(): void {
    this.dialogRef.close(true);
  }
}
