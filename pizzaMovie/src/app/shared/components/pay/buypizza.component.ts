import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PSEComponent } from '../../components/pay/pse/pse.component';

@Component({
  selector: 'app-buypizza',
  templateUrl: './buypizza.component.html',
  styleUrls: ['./pay.component.scss']
})

export class BuypizzaComponent {

  constructor(
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
          alert('Pago Éxitoso!');
        }
      });

      handler.open({
        name: 'Comprar Pizza',
        description: 'Comprar pizza a través de PizzaMovie',
        amount: amount * 100
      });
  }

  openPSE() {
    this.dialogRef1 = this.dialog.open(PSEComponent);
  }

}
