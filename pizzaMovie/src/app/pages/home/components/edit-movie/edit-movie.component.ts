import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {

  content;
  edit='';
  
  constructor(
    public storageService: StorageService,    
  ) { }

  ngOnInit() {
  }

  openEdit(movie){
    this.edit=movie
  }

  cancel(){
    this.edit=''
    this.content=''
  }

  acept(){  
    this.content=document.getElementById("text-a")
    console.log(this.content);
    
    this.edit=''  
  }

}
