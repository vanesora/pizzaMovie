import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {

  content;
  edit;
  
  constructor(
    public storageService: StorageService, 
    public movieService: MovieService   
  ) { }

  ngOnInit() {
  }

  openEdit(movie){
    this.edit=movie
  }

  cancel(){
    this.edit=null;
    this.content=''
  }

  acept(){  
    this.content=(<HTMLInputElement>document.getElementById("text-a")).value;
    this.edit.description=this.content  
    return this.movieService.updateMovie(this.edit).then(data=>{
      this.edit=null;
    }).catch(err=>{
      this.edit=null;
    })
  }

  delete(movie){
    return this.movieService.delete(movie).then()
  }

}
