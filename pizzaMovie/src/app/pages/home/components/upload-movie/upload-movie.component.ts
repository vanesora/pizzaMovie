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
import { Series } from 'src/app/shared/models/series';

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
  filesToUploadSerie;
  filesToUploadPictureSerie;
  schForm: FormGroup;
  schFormSerie: FormGroup;
  source: string = '';
  select = 'movie';
  serie;
  actualSeason = 1;
  actualChapter = 1;
  updateVideo = false;

  //
  type = ['Drama', 'Comedia', 'Anime', 'Romance']
  number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

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
    this.initializeFormSerie();
  }

  initializeForm() {
    this.schForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(400)]],
      type: ['', [Validators.required]],
    });
  }

  initializeFormSerie() {
    this.schFormSerie = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(400)]],
      type: ['', [Validators.required]],
      seasons: ['', [Validators.required]],
      chapters: ['', [Validators.required]],
    });
  }


  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <File>fileInput.target.files[0];//recoger archivos seleccionados en el input
    this.projectImage(this.filesToUpload)
  }
  fileChangeEventSeriePicture(fileInput: any) {
    this.filesToUploadPictureSerie = <File>fileInput.target.files[0];//recoger archivos seleccionados en el input
    this.projectImageSerie(this.filesToUploadPictureSerie)
  }

  fileChangeEventSerie(fileInput: any) {
    this.filesToUploadSerie = <File>fileInput.target.files[0];//recoger archivos seleccionados en el input

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

  projectImageSerie(file: File) {
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
      movie: '',
      description: this.schForm.value.description,
      picture: '',
      dateAdd: moment().format('DD-MM-YYYY HH:mm')
    };
  }

  submitFormSerie() {
    if (!this.schFormSerie.valid) {
      this.snackBar.open('revisa los campos en rojo', 'OK', { duration: 4000 });
      return;
    }
    let serie = this.serealizeFormSerie();
    return this.dataApiService.post(serie, 'serie').then(data => {
      console.log(data);

      if (this.filesToUploadPictureSerie) {
        return this.dataApiService.postImg(this.filesToUploadPictureSerie, 'upload-picture-serie/' + data.serie._id).then(serie_ => {
          this.updateVideo = true;
          this.snackBar.open('Serie subida de forma correcta', 'OK', { duration: 4000 });
          this.serie = serie_.serie
          for (var i = 1; i <= this.schFormSerie.value.seasons; i++) {
            this.serie.seasons.push({ chaptersNumber: this.schFormSerie.value.chapters, chapters: [] });
          }
        })
      } else {
        this.updateVideo = true;
        this.snackBar.open('Serie subida de forma correcta', 'OK', { duration: 4000 });
        this.serie = data.serie
        for (var i = 1; i <= this.schFormSerie.value.seasons; i++) {
          this.serie.seasons.push({ chaptersNumber: this.schFormSerie.value.chapters, chapters: [] });
        }
      }

    }).catch(err => {
      this.snackBar.open('No se pudo subir la serie', 'OK', { duration: 4000 });
    })
  }

  uploadVideo() {
    if (!this.filesToUploadSerie) {
      this.snackBar.open('Debes cargar un vídeo', 'OK', { duration: 4000 });
      return
    }
    return this.dataApiService.postFile(
      this.filesToUploadSerie, 'upload-file-serie/' + this.serie._id)
      .then(result => {
        this.serie.seasons[this.actualSeason - 1].chapters.push(result.serie.archivo)
        this.snackBar.open('Archivo cargado correctamente', 'OK', { duration: 4000 })
        console.log(this.serie);
        this.filesToUploadSerie=null        
        if (this.actualChapter == this.schFormSerie.value.chapters) {
          if (this.actualSeason == this.schFormSerie.value.seasons) {
            this.updateVideo = false;
            this.dataApiService.update(this.serie,'serie/'+this.serie._id).then(yap=>{
              console.log(yap);
            })
            this.snackBar.open('ya se subieron todos los archivos', 'OK', { duration: 4000 })

            this.schFormSerie.reset();
          } else {
            this.actualSeason = this.actualSeason + 1
            this.actualChapter = 1
          }
        } else {
          this.actualChapter = this.actualChapter + 1
        }
      })
  }

  serealizeFormSerie(): Series {
    return {
      title: this.schFormSerie.value.title,
      type: this.schFormSerie.value.type,
      description: this.schFormSerie.value.description,
      seasonNumber: this.schFormSerie.value.seasons,
      picture: '',
      dateAdd: moment().format('DD-MM-YYYY HH:mm')
    };
  }

  changeSelect(data) {
    this.select = data;
  }

}
