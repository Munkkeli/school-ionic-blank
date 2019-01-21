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

  getMediaFile = (file: { filename: string }): Pic => {
    return {
      ...file,
      original: `http://media.mw.metropolia.fi/wbma/uploads/${file.filename}`,
      thumbnails: {
        160: `http://media.mw.metropolia.fi/wbma/uploads/${file.filename
          .split('.')
          .slice(0, -1)
          .join('.')}-tn160.png`
      }
    } as Pic;
  };
}
