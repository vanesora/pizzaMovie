import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { PayComponent } from '../components/pay/pay.component';
import { BuypizzaComponent } from '../components/pay/buypizza.component';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class PopupPayService {

  constructor(
    public storageService: StorageService,
    private dialog: MatDialog,
    private dialogBuyPizza: MatDialog,
    private dialogRef: MatDialogRef<PayComponent>,
    private dialogRefBuypizza: MatDialogRef<BuypizzaComponent>
  ) { }

  //Opens a dialog window, with payment info
  //the type defines if is for pizza or for premium plan
  openAlertDialog(type) {
    if (type == 'Pizza') {
      this.dialogRefBuypizza = this.dialogBuyPizza.open(BuypizzaComponent);
      return this.onReadyDB(20,type).then()
    } else {
      this.dialogRef = this.dialog.open(PayComponent);
      return this.onReadyDB(20,type).then()
    }
  }

  close(): void {
    this.dialogRef.close(true);
  }

  onReadyDB(tries = 20, type): Promise<any> {
    return new Promise((resolve, reject) => {
      if (tries <= 0) {
        reject('max tries onReadyDB');
        console.error('max tries onReadyDB');
      }
      if (this.storageService.pay == true) {
        if (type == 'Pizza'){
          this.dialogRefBuypizza.close()
        }else{
          this.dialogRef.close()
        }
        resolve(true);
      } else {
        setTimeout(() => {
          this.onReadyDB(tries--, type).then(() => {
            resolve(true);
          });
        }, 300);
      }
    });
  }
}