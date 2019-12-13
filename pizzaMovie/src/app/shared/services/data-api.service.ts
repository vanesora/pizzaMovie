import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  url_api = 'http://localhost:8880/api/';

  constructor(
    private http: HttpClient,
    public storageService: StorageService
  ) { }

  get headers(): HttpHeaders {
    return new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + this.getToken()
    });
  }

  get headersFile(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken()
    });
  }

  getToken() {
    if (this.storageService.getValue('token')) {
      const token = this.storageService.getValue('token');
      return token;
    } else {
      return null;
    }
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
    return this.http
      .post(this.url_api + extension, element, { headers: this.headers })
      .toPromise();
  }
}
