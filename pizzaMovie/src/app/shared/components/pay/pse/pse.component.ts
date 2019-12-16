import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-pse',
  templateUrl: './pse.component.html',
  styleUrls: ['./pse.component.scss']
})

export class PSEComponent{
  processPayment() {
    alert('Pago Éxitoso!');
  }
}
