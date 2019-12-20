import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  url_api = 'http://localhost:3977/api/';

  constructor(
    private http: HttpClient,
    public storageService: StorageService
  ) { }

  get headers(): HttpHeaders {
    return new HttpHeaders({
      'content-type': 'application/json'
    });
  }

  getAll(extension: string): Promise<any> {
    return this.http
      .get(this.url_api + extension, { headers: this.headers })
      .toPromise();
  }

  getById(exension: string, id: string) {
    return this.http
      .get(this.url_api + exension + '/' + id, { headers: this.headers })
      .toPromise<any>().then();
  }

  post(element, extension: string): Promise<any> {
    let elementString
    elementString= JSON.stringify(element)
    return this.http
      .post(this.url_api + extension, elementString, { headers: this.headers })
      .toPromise();
  }

  update(element, extension: string): Promise<any> {
    let elementString
    elementString= JSON.stringify(element)
    return this.http
      .put(this.url_api + extension, elementString, { headers: this.headers })
      .toPromise();
  }

  postImg(file: File, extension: string): Promise<any> {
    var formData = new FormData();
    formData.append('image', file);
    return this.http
      .post(this.url_api + extension, formData)
      .toPromise();
  }

  postFile(file: File, extension: string): Promise<any> {
    var formData = new FormData();
    formData.append('file', file);
    return this.http
      .post(this.url_api + extension, formData)
      .toPromise();
  }

  delete(extension: string): Promise<any> {
    return this.http
      .delete(this.url_api + extension, { headers: this.headers })
      .toPromise();
  }
}
