import {
  Component, ViewChild, OnInit, Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { MatSnackBar } from '@angular/material';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { MatDialog } from '@angular/material';
import { TermsComponent } from 'src/app/pages/register/terms/terms.component';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  alphabeticalPattern = "^[a-zA-ZñÑáéíóú ]{1,20}$";

  @ViewChild('myForm', { static: false }) myForm: NgForm;
  @Output() onChange: EventEmitter<File> = new EventEmitter<File>();


  schForm: FormGroup;
  source: string = '';
  premium = false;
  termsConditions = false;

  //
  jobTypes = ['Mujer', 'Hombre', 'Otro']

  constructor(
    public fb: FormBuilder,
    public storageService: StorageService,
    public spinnerService: SpinnerService,
    public userSercie: UserService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  openTerms() {
    this.dialog.open(TermsComponent, {
      width: '800px',
      height: '600px',
    });
  }

  initializeForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.schForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.alphabeticalPattern)]],
      lastName: ['', [Validators.required, Validators.pattern(this.alphabeticalPattern)]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      password: ['', [Validators.required, , this.checkPassword]],
    });
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  checkInUseEmail(control) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  fileChangeEvent(fileInput: any) {
    this.userSercie.filesToUpload = <File>fileInput.target.files[0];//recoger archivos seleccionados en el input
    this.projectImage(this.userSercie.filesToUpload)
  }

  projectImage(file: File) {
    let reader = new FileReader;
    // TODO: Define type of 'e'
    reader.onload = (e: any) => {
      // Simply set e.target.result as our <img> src in the layout
      this.source = e.target.result;
      this.onChange.emit(file);
    };
    // This will process our file and get it's attributes/data
    reader.readAsDataURL(file);
  }

  submitForm() {
    if (!this.schForm.valid) {
      this.snackBar.open('revisa los campos en rojo', 'OK', { duration: 4000 });
      return;
    }
    if (!this.termsConditions) {
      this.snackBar.open('Debes aceptar los terminos y condiciones', 'OK', { duration: 4000 });
      return;
    }
    let user: User
    user = this.serealizeForm();
    return this.userSercie.saveUser(user).then(data => {
      if (data != 'in pay') {
        this.snackBar.open('Usuario creado correctamente', 'OK', { duration: 4000 });
      }
      this.myForm.resetForm();
      this.schForm.reset();
    }).catch(err => {
      this.snackBar.open('Error al crear el usuario / ' + err.message, 'OK', { duration: 4000 });
    })
  }

  serealizeForm(): User {
    return {
      name: this.schForm.value.name,
      lastName: this.schForm.value.lastName,
      gender: this.schForm.value.gender,
      email: this.schForm.value.email,
      password: this.schForm.value.password,
      type: this.premium ? 'USER_PREMIUM' : 'USER_FREE',
      picture: ''
    };
  }


}
