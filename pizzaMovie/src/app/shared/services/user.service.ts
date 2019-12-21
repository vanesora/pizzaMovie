import { Injectable } from '@angular/core';
import { DataApiService } from './data-api.service';
import { PopupPayService } from './popup-pay.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  filesToUpload: File;
  pay = false;
  _logOut = false;
  newUser;

  constructor(
    public dataApiService: DataApiService,
    public payService: PopupPayService,
    public storageService: StorageService,
    private router: Router,
    public spinnerService: SpinnerService,
  ) { }

  saveUser(user): Promise<any> {
    if (user.type == 'USER_PREMIUM') {
      this.payService.openAlertDialog('pay');
      this.storageService.setValue('pay', false)
      return this.onReadyDB(20, user).then(data => {
        return this.newUser
      })
    } else {
      return this.dataApiService.post(user, 'user').then(data => {
        if (this.filesToUpload) {
          return this.dataApiService.postImg(this.filesToUpload, 'upload-picture-user/' + data.user._id).then()
        } else {

          return data;
        }
      })
    }
  }

  saveUserPay(user): Promise<any> {
    return this.dataApiService.post(user, 'user').then(data => {
      if (this.filesToUpload) {
        return this.dataApiService.postImg(this.filesToUpload, 'upload-picture-user/' + data.user._id).then(_user => {
          return _user;
        })
      } else {
        return data;
      }
    })
  }

  updateUser(user, file): Promise<any> {
    return this.dataApiService.update(user, 'user/' + user._id).then(userRes => {
      console.log(userRes)
      if (file) {
        return this.dataApiService.postImg(file, 'upload-picture-user/' + userRes.user._id).then(_user => {
          console.log(_user);
          return _user;
        })
      }
      return userRes;
    })
  }

  updateFavorites(user, movie) {
    if (!user.favoritiesMovies) {
      user.favoritiesMovies=[];
    }
    user.favoritiesMovies.push(movie);
    return this.dataApiService.update(user, 'user/' + user._id).then(userRes => {
      this.storageService.setValue('session', user)
      return userRes;
    })
  }

  onReadyDB(tries = 20, user): Promise<any> {
    return new Promise((resolve, reject) => {
      if (tries <= 0) {
        reject('max tries onReadyDB');
        console.error('max tries onReadyDB');

      }
      if (this.storageService.pay == true) {
        return this.saveUserPay(user).then(data => {
          this.newUser = data
          resolve(data)
        })
      } else {
        setTimeout(() => {
          this.onReadyDB(tries--, user).then(() => {
            resolve(true);
          });
        }, 500);
      }
    });
  }

  logIn(user): Promise<any> {
    return this.dataApiService.post(user, 'user-login').then()
  }

  logOut() {
    this.storageService.cleanUser();
    this.storageService.setValue('page', 'Preview');
    this.router.navigate(['']);
    this.spinnerService.openAlertDialog();
    setTimeout(() => {
      this.spinnerService.close();
    }, 3000)
  }


}
