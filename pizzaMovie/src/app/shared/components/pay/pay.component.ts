import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PSEComponent } from '../../components/pay/pse/pse.component';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})

export class PayComponent {

  constructor(
    public storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<{}>,
    private dialogRef1: MatDialogRef<PSEComponent>) {
  }

  loadStripe() {
    console.log('stripe loaded');
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
  }

  ngOnInit() {
    this.loadStripe();
  }

  pay(amount) {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
      locale: 'es',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      },
      opened: function () {
        console.log("Form opened");
      },
      closed: ()=>{this.payTrue()}
    });

  handler.open({
    name: 'PREMIUM PizzaMovie',
    description: 'plan premium',
    amount: amount * 100
    });

  }

payTrue(){
  this.storageService.setValue('pay', true)
  this.dialogRef.close()
}

openPSE() {
  this.dialogRef1 = this.dialog.open(PSEComponent);
  return this.onReadyDB().then()
}

onReadyDB(tries = 20): Promise < any > {
  return new Promise((resolve, reject) => {
    if (tries <= 0) {
      reject('max tries onReadyDB');
      console.error('max tries onReadyDB');
    }    
    if (this.storageService.pay == true) {
      this.dialogRef1.close()
      this.dialogRef.close()
      resolve(true);
    } else {
      setTimeout(() => {
        this.onReadyDB(tries--).then(() => {
          resolve(true);
        });
      }, 300);
    }
  });
}
}
