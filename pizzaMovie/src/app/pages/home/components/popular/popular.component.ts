import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { MovieService } from '../../../../shared/services/movie.service';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { element } from 'protractor';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],

})
export class PopularComponent implements OnInit {

  public details = document.getElementById('details')
  arrTopMovies;
  peliculasUno;
  peliculasDos;
  peliculasTres
  constructor(
    public storageService: StorageService,
    public movieService: MovieService
  ) {

  }

  ngOnInit() {
    this.topMovies();
  }

  topMovies() {
    var movies = this.storageService.movies;
    this.movieService.getTopMovies().then(datos => {
      this.arrTopMovies = datos.movies;
      this.peliculasUno = this.arrTopMovies.slice(0, 3),
      this.peliculasDos = this.arrTopMovies.slice(3, 6),
      this.peliculasTres = this.arrTopMovies.slice(6, 9)
    });
  }
}

