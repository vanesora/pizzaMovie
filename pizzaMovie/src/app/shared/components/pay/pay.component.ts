import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PSEComponent } from '../../components/pay/pse/pse.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})

export class PayComponent {

  constructor(
    public userServie: UserService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<{}>,
    private dialogRef1: MatDialogRef<PSEComponent>) {
  }

  loadStripe() {
      console.log('stripe loaded');
      if(!window.document.getElementById('stripe-script')) {
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
          console.log(token)
          alert('Pago exitoso');
          this.dialogRef.close()
        }
      });

      handler.open({
        name: 'PREMIUM PizzaMovie',
        description: 'plan premium',
        amount: amount * 100
      });
  }

  openPSE() {
    this.dialogRef1 = this.dialog.open(PSEComponent);
    setTimeout(()=>{
      this.dialogRef1.close()
      this.dialogRef.close()
    },6000)
  }
  

}
