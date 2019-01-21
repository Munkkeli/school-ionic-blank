import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pic from '../../interfaces/pic';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  constructor(public http: HttpClient) {
    this.http = http;
  }

  getAllFiles = () => {
    return this.http.get<Pic[]>(
      'http://media.mw.metropolia.fi/wbma/media?start=0&limit=10'
    );
  };

  getSingleMedia = (id: number) => {
    return this.http.get<Pic>(`http://media.mw.metropolia.fi/wbma/media/${id}`);
  };
}
