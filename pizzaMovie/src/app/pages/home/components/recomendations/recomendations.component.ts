import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { MovieService } from 'src/app/shared/services/movie.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-recomendations',
  templateUrl: './recomendations.component.html',
  styleUrls: ['./recomendations.component.scss']
})
export class RecomendationsComponent implements OnInit {

  url;
  rutaImagen;
  arrTopMovies;
  peliculasUno;
  peliculasDos;
  peliculasTres;
  constructor(
    public storageService: StorageService,
    public movieService: MovieService,
    public userService: UserService,
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

  play(movie){
    this.movieService.play(movie);
  }

  favorites(movie){
    this.userService.updateFavorites(this.storageService.session,movie);
  }
}
