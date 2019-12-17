import { Component, Inject } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-pse',
  templateUrl: './pse.component.html',
  styleUrls: ['./pse.component.scss']
})

export class PSEComponent{
  constructor(
    public userSercie: UserService,
    public snackBar: MatSnackBar,
  ){}
  processPayment() {
    this.snackBar.open('Pago exitoso', 'OK', { duration: 4000 });
    setTimeout(()=>{
      return this.userSercie.saveUserPay().then(data=>{
        this.snackBar.open('Usuario creado correctamente', 'OK', { duration: 4000 });
      })
    },3000)
  }
}
