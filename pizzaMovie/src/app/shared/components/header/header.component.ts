import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { LoginComponent } from './components/login/login.component';
import { MatDialog } from '@angular/material';
import { UserService } from '../../services/user.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  url = "http://localhost:3977/api/"

  constructor(
    public storageService: StorageService,
    public dialog: MatDialog,
    public userService: UserService,
    public configService: ConfigService,
  ) { }

  ngOnInit() {
  }

  logIn(){
    this.dialog.open(LoginComponent);
    return this.onReadyDB().then()
  }

  onReadyDB(tries = 20): Promise<any> {
    return new Promise((resolve, reject) => {
      if (tries <= 0) {
        reject('max tries onReadyDB');
        console.error('max tries onReadyDB');
      }
      if (this.storageService.session) {
        this.dialog.closeAll()
        resolve(true);
      } else {
        setTimeout(() => {
          this.onReadyDB(tries--).then(() => {
            resolve(true);
          });
        }, 300);
      }
    });
  }

  logOut(){
    this.userService._logOut=true;
  }

  logOutFun(){
    this.userService.logOut()
    this.userService._logOut=false;
    this.configService.page='home';
    this.configService.menu.map(data=>{
      data.auth=false;
    })
  }

  noLogOut(){
    this.userService._logOut=false;
  }

}
