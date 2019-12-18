import { Component, Inject } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-pse',
  templateUrl: './pse.component.html',
  styleUrls: ['./pse.component.scss']
})

export class PSEComponent{
  constructor(
    public storageService: StorageService,
    public snackBar: MatSnackBar,
  ){}
  processPayment() {
    this.snackBar.open('Pago exitoso', 'OK', { duration: 4000 });
    setTimeout(()=>{
      this.storageService.setValue('pay', true)
    },500)
  }
}
