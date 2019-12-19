import { Injectable } from '@angular/core';
import { DataApiService } from './data-api.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    public dataApiService: DataApiService,
  ) { }

  uploadMovie(movie, fileImage, fileMovie): Promise<any> {
    return this.dataApiService.post(movie, 'movie').then(data => {
      return this.dataApiService.postFile(fileMovie, 'upload-file-movie/' + data.movie._id).
        then(movieFile => {
          if(fileImage){
            return this.dataApiService.postImg(fileImage, 'upload-picture-movie/' + data.movie._id).
            then(movieImg=>{
              return movieImg;
            })
          }
          else{
            return movieFile;
          }
        })
    })
  }
}
