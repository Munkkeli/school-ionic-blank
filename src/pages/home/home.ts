import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { HttpClient } from '@angular/common/http';
import Pic from '../../interfaces/pic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    private photoViewer: PhotoViewer,
    private http: HttpClient
  ) {
    this.http = http;
    this.loadPicArray();
  }

  picArray: Pic[] = [];

  loadPicArray = () => {
    this.http
      .get<Pic[]>('http://media.mw.metropolia.fi/wbma/media?start=0&limit=10')
      .subscribe(
        res =>
          (this.picArray = res.map(x => ({
            ...x,
            original: `http://media.mw.metropolia.fi/wbma/uploads/${
              x.filename
            }`,
            thumbnail: `http://media.mw.metropolia.fi/wbma/uploads/${x.filename
              .split('.')
              .slice(0, -1)
              .join('.')}-tn160.png`
          })))
      );
  };

  showFullImage = (item: Pic) => {
    this.photoViewer.show(item.original, item.title);
  };
}
