import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites;
  movieSelect='';
  url = "http://localhost:3977/api/";

  constructor(
    public storageService: StorageService,
  ) { 
    
  }

  ngOnInit() {
    this.favorites=this.storageService.movies
    this.movieSelect=this.storageService.movies[0]? this.storageService.movies[0] : ''
  }

  select(movie){
    this.movieSelect=movie
  }
  

}
