import { Component, OnInit } from '@angular/core';
import {SafeResourceUrl, DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { StorageService } from 'src/app/shared/services/storage.service';
import { MovieService } from '../../../../shared/services/movie.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],

})
export class PopularComponent implements OnInit {

  url;
  rutaImagen;
  arrTopMovies;
  peliculasUno;
  peliculasDos;
  peliculasTres;
  constructor(
    public storageService: StorageService,
    public movieService: MovieService,
    private sanitization : DomSanitizer
  ) {

  }

  ngOnInit() {
    this.topMovies();
  }

  topMovies() {
    debugger;
    var movies = this.storageService.movies;
    this.movieService.getTopMovies().then(datos => {
      this.url = "http://localhost:3977/api/";
      this.arrTopMovies = datos.movies.map(movie => {
        movie.background = this.sanitization.bypassSecurityTrustStyle(`url(${this.url}get-picture-movie/${movie.picture})`);
        return movie;
      });
      
      this.peliculasUno = this.arrTopMovies.slice(0, 3),
      this.peliculasDos = this.arrTopMovies.slice(3, 6),
      this.peliculasTres = this.arrTopMovies.slice(6, 9)

      console.log(movies.picture);
    });
  }

}

