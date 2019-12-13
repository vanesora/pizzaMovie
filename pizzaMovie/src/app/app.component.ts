import { Component, ViewChild } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service';
import { MatSidenav } from '@angular/material';

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
  login=false;
  
  constructor(
    public spinnerService: SpinnerService
  ){
  }
}
