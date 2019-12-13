import { Component } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pizzaMovie';

  constructor(
    public spinnerService: SpinnerService
  ){
    this.spinnerService.openAlertDialog();
  }
}
