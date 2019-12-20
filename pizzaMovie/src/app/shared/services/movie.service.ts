import { Injectable } from '@angular/core';
import { DataApiService } from './data-api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    public dataApiService: DataApiService,
    public storageService: StorageService,
  ) { }

  setMovie(movie, fileImage, fileMovie): Promise<any> {
    return this.dataApiService.post(movie, 'movie').then(data => {
      return this.dataApiService.postFile(fileMovie, 'upload-file-movie/' + data.movie._id).
        then(movieFile => {
          if (fileImage) {
            return this.dataApiService.postImg(fileImage, 'upload-picture-movie/' + data.movie._id).
              then(movieImg => {
                return movieImg;
              })
          }
          else {
            return movieFile;
          }
        })
    })
  }

  deleteMovie() {

  }

  updateMovie(movie): Promise<any> {
    return this.dataApiService.update(movie, 'movie/' + movie._id).then(data => {
      return this.dataApiService.getAll('movies').then(data => {
        if (data && data.movies) {
          this.storageService.setValue('movies', data.movies)
        }
      }).catch(err => {
        console.log(err);
      })
    })
  }

  delete(movie): Promise<any>{
    return this.dataApiService.delete('movie/' + movie._id).then(data=>{
      return this.dataApiService.getAll('movies').then(data => {
        if (data && data.movies) {
          this.storageService.setValue('movies', data.movies)
        }
      }).catch(err => {
        console.log(err);
      })
    })
  }
}
