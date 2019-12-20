import { Component, ViewChild } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service';
import { MatSidenav } from '@angular/material';
import { StorageService } from './shared/services/storage.service';
import { PopupPayService } from './shared/services/popup-pay.service';
import { UserService } from './shared/services/user.service';
import { DataApiService } from './shared/services/data-api.service';
import { ConfigService } from './shared/services/config.service';

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
    public dataApiService: DataApiService,
    public configService: ConfigService,
  ) {
    this.storageService.load();
    // this.spinnerService.openAlertDialog();
    // setTimeout(()=>{
    //   this.spinnerService.close();
    // },3000)
    if (!this.storageService.movies) {
      this.dataApiService.getAll('movies').then(data => {
        if (data && data.movies) {
          this.storageService.setValue('movies', data.movies)
        }
      }).catch(err => {
        console.log(err);
      })
    }
    if (this.storageService.session) {
      this.configService.authComp();
    }
  }
}
