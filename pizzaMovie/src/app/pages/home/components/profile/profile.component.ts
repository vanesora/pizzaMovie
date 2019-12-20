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
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  alphabeticalPattern = "^[a-zA-ZñÑáéíóú ]{1,20}$";

  @ViewChild('myForm', { static: false }) myForm: NgForm;
  @Output() onChange: EventEmitter<File> = new EventEmitter<File>();


  schForm: FormGroup;
  source: string = '';
  user;
  filesToUpload;
  url = "http://localhost:3977/api/"

  //
  jobTypes = ['Mujer', 'Hombre', 'Otro']

  constructor(
    public fb: FormBuilder,
    public storageService: StorageService,
    public spinnerService: SpinnerService,
    public userSercie: UserService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
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
      name: [this.storageService.session.name, [Validators.required, Validators.pattern(this.alphabeticalPattern)]],
      lastName: [this.storageService.session.lastName, [Validators.required, Validators.pattern(this.alphabeticalPattern)]],
      gender: [this.storageService.session.gender, [Validators.required]],
      email: [{ value: this.storageService.session.email, disabled: true }, [Validators.required, Validators.pattern(emailregex)]],
      password: [this.storageService.session.password, [Validators.required, , this.checkPassword]],
    });
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <File>fileInput.target.files[0];//recoger archivos seleccionados en el input
    this.projectImage(this.filesToUpload)
    SourceBufferList.length
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
    this.user = this.storageService.session
    this.serealizeForm();
    return this.userSercie.updateUser(this.user, this.filesToUpload).then(data => {
      if (data.user) {
        this.spinnerService.openAlertDialog();
        this.storageService.setValue('session', data.user);
        this.schForm.patchValue({
          name: data.user.name,
          lastName: data.user.lastName,
          gender: data.user.gender,
          email: data.user.email,
          password: data.user.password
        });
        setTimeout(() => {
          this.snackBar.open('Usuario actualizado correctamente', 'OK', { duration: 4000 });
          this.spinnerService.close();
        }, 3000)

      }
      this.filesToUpload = '';
    }).catch(err => {
      this.snackBar.open('Error al crear el usuario / ' + err.message, 'OK', { duration: 4000 });
    })
  }

  serealizeForm() {
    this.user.name = this.schForm.value.name;
    this.user.lastName = this.schForm.value.lastName;
    this.user.gender = this.schForm.value.gender;
    this.user.email = this.schForm.value.email;
    this.user.password = this.schForm.value.password;
    if(!this.user.picture){
      this.user.picture='';
    }
  }


}
