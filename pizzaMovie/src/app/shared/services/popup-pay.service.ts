import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { PayComponent } from '../components/pay/pay.component';
import { BuypizzaComponent } from '../components/pay/buypizza.component';

@Injectable({
  providedIn: 'root'
})

export class PopupPayService {

  constructor(
    private dialog: MatDialog,
    private dialogBuyPizza: MatDialog,
    private dialogRef: MatDialogRef<PayComponent>,
    private dialogRefBuypizza: MatDialogRef<BuypizzaComponent>
  ) { }

  //Opens a dialog window, with payment info
  //the type defines if is for pizza or for premium plan
  openAlertDialog(type) {
    console.log(type);
    if (type == 'Pizza') {
      this.dialogRefBuypizza = this.dialogBuyPizza.open(BuypizzaComponent);
    } else {
      this.dialogRef = this.dialog.open(PayComponent);
    }
  }

  close(): void {
    this.dialogRef.close(true);
  }
}