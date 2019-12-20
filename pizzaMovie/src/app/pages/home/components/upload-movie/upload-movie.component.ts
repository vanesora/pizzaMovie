import {
  Component, ViewChild, OnInit, Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { StorageService } from 'src/app/shared/services/storage.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Movies } from 'src/app/shared/models/movies';
import { MovieService } from 'src/app/shared/services/movie.service';
import * as moment from 'moment';
import { DataApiService } from 'src/app/shared/services/data-api.service';

@Component({
  selector: 'app-upload-movie',
  templateUrl: './upload-movie.component.html',
  styleUrls: ['./upload-movie.component.scss']
})
export class UploadMovieComponent implements OnInit {

  alphabeticalPattern = "^[a-zA-ZñÑáéíóú ]{1,20}$";

  @ViewChild('myForm', { static: false }) myForm: NgForm;
  @Output() onChange: EventEmitter<File> = new EventEmitter<File>();

  filesToUpload;
  filesToUploadMovie;
  schForm: FormGroup;
  source: string = '';

  //
  type = ['Drama', 'Comedia', 'Anime', 'Romance']

  constructor(
    public fb: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,
    public movieService: MovieService,
    public dataApiService: DataApiService,
    public storageService: StorageService
  ) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.schForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(400)]],
      type: ['', [Validators.required]],
    });
  }


  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <File>fileInput.target.files[0];//recoger archivos seleccionados en el input
    this.projectImage(this.filesToUpload)
  }

  fileChangeEventMovie(fileInput: any) {
    this.filesToUploadMovie = <File>fileInput.target.files[0];//recoger archivos seleccionados en el input
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
    if (!this.filesToUploadMovie) {
      this.snackBar.open('Debes cargar una película', 'OK', { duration: 4000 });
      return;
    }
    let movie = this.serealizeForm();
    this.movieService.setMovie(movie, this.filesToUpload, this.filesToUploadMovie).then(data => {
      this.snackBar.open('Película subida de forma correcta', 'OK', { duration: 4000 });
      return this.dataApiService.getAll('movies').then(data => {
        if (data && data.movies) {
          this.storageService.setValue('movies', data.movies)
        }
        this.myForm.resetForm();
        this.schForm.reset();
        this.filesToUpload = '';
        this.filesToUploadMovie = '';
      })
    }).catch(err => {
      this.snackBar.open('No se pudo subir la película', 'OK', { duration: 4000 });
    })
  }

  serealizeForm(): Movies {
    return {
      title: this.schForm.value.title,
      type: this.schForm.value.type,
      description: this.schForm.value.description,
      movie: '',
      picture: '',
      dateAdd: moment().format('DD-MM-YYYY HH:mm')
    };
  }

}
