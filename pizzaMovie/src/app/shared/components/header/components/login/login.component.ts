import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { DataApiService } from 'src/app/shared/services/data-api.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { ConfigService } from 'src/app/shared/services/config.service';

const material = [
  MatDialogModule,
];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  formLogin: FormGroup;
  options: FormGroup;
  user = new User();
  messageError;

  constructor(
    private fb: FormBuilder,
    public dataApiService: DataApiService,
    public storageService: StorageService,
    public userService: UserService,
    private router: Router,
    public configService: ConfigService,
  ) {
    this.user = {
      email: '',
      gender: '',
      lastName: '',
      name: '',
      password: '',
      picture: '',
      type: ''
    }
  }

  ngOnInit() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailregex)]],
      password: ['', [Validators.required]]

    })
  }


  logIn() {
    this.user.email = this.formLogin.value.email;
    this.user.password = this.formLogin.value.password;
    return this.userService.logIn(this.user).then(data => {
      if (data.message) {
        this.messageError = 'Usuario y/o contraseña incorrectos'
        setTimeout(() => {
          this.messageError = ''
        }, 3000)
      } else {
        this.storageService.setValue('session', data.user);
        this.storageService.setValue('page', 'Home');
        this.router.navigate(['/home']);
        return this.dataApiService.getAll('movies').then(data=>{
          if(data && data.movies){
            this.storageService.setValue('movies', data.movies)
          }
          this.auth();
        })
      }
    }).catch(err => {
      this.messageError = 'Usuario y/o contraseña incorrectos'
      setTimeout(() => {
        this.messageError = ''
      }, 3000)
    })
  }

  auth(){
    this.configService.menu.map(data=>{
      data.auth=false;
    })
    this.configService.menu.map(data => {
      if (this.storageService.session.type == 'USER_PREMIUM') {
        let valid = this.configService.auth.premium.find(auth => auth == data.page)
        if (valid) { data.auth = true }
      }
      if (this.storageService.session.type == 'USER_FREE') {

        let valid = this.configService.auth.free.find(auth => auth == data.page)
        if (valid) { data.auth = true }
      }
      if (this.storageService.session.type == 'USER_ADMIN') {
        let valid = this.configService.auth.admin.find(auth => auth == data.page)
        if (valid) { data.auth = true }
      }
    })
  }


}
