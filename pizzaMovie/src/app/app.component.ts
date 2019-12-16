import { Component, ViewChild } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service';
import { MatSidenav } from '@angular/material';
import { StorageService } from './shared/services/storage.service';

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
    public storageService: StorageService
  ){
    this.spinnerService.openAlertDialog();
    setTimeout(()=>{
      this.spinnerService.close();
    },3000)

  }
}
