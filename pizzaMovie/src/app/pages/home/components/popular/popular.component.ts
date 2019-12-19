import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { MovieService } from '../../../../shared/services/movie.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],

})
export class PopularComponent implements OnInit {

  public details = document.getElementById('details')
  arrTopMovies;
  constructor(
    public storageService: StorageService,
    public movieService: MovieService
  ) { 
    
  }

  ngOnInit() {
    this.topMovies();
//     $http.get('GET-TOP-MOVIES')
// .success(function(respuesta){
// //código en caso de éxito
// movies = RESPUESTA;
// });
  }

  topMovies() {
    var movies = this.storageService.movies;   
    this.movieService.getTopMovies().then(datos => {
      this.arrTopMovies = datos.movies;
    });
  }

}

