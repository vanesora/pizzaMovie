import { Component, ViewChild } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service';
import { MatSidenav } from '@angular/material';
import { StorageService } from './shared/services/storage.service';
import { PopupPayService } from './shared/services/popup-pay.service';
import { LoginComponent } from './pages/preview/components/login/login.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;
  events: string[] = [];
  opened: boolean = true;
  title = 'pizzaMovie';
  
  constructor(
    public spinnerService: SpinnerService,
    public payService: PopupPayService,
    public storageService: StorageService,
  ){
    this.storageService.load();
    this.spinnerService.openAlertDialog();
    setTimeout(()=>{
      this.spinnerService.close();
    },3000)
    public dialog: MatDialog
  abrirModal () {
    this.dialog.open(LoginComponent);
  }

  openDialog(type){
    this.payService.openAlertDialog(type)
  }
}
