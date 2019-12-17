import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { DataApiService } from './data-api.service';
import { PopupPayService } from './popup-pay.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  filesToUpload: File;
  pay=false;
  user:User;

  constructor(
    public dataApiService: DataApiService,
    public payService: PopupPayService,
  ) { }

  saveUser(user): Promise<any> {
    this.user=user;
    if (user.type == 'USER_PREMIUM') {
      this.payService.openAlertDialog('pay');
      return new Promise((resolve, reject) =>{
        resolve('in pay')
      })
    } else {
      return this.dataApiService.post(user, 'user').then(data => {
        if (this.filesToUpload) {
          return this.dataApiService.postImg(this.filesToUpload, 'upload-picture-user/' + data.user._id).then()
        }
      })
    }
  }

  saveUserPay(): Promise<any> {
    return this.dataApiService.post(this.user, 'user').then(data => {
      if (this.filesToUpload) {
        return this.dataApiService.postImg(this.filesToUpload, 'upload-picture-user/' + data.user._id).then()
      }
    })
  }

  
}
