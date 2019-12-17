import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

const material = [
  MatDialogModule,
]; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  options: FormGroup;

  constructor( private fb: FormBuilder) { }

  ngOnInit() {
    this.formLogin = this.fb.group ({
      hideRequired: false,
      floatLabel: 'auto',
      email: '',
      password: ''
      
    }),

    this.formLogin.valueChanges.subscribe(console.log)
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl ( '', [Validators.required]);

  mensajeDeError() {
    return this.email.hasError('required') ? 'Ingresa un correo para continuar' :
        this.email.hasError('email') ? 'Ingresa un correo válido' :
            '';
  }

  mensajePassword () {
    return this.password.hasError('required') ? 'Ingresa tu contraseña para continuar':
            this.password.hasError('password') ? 'Ups!, contraseña errada' : '';
  }

  
}
