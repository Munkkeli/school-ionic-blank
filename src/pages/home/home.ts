import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { HttpClient } from '@angular/common/http';
import { MediaProvider } from '../../providers/media/media';
import Pic from '../../interfaces/pic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    private photoViewer: PhotoViewer,
    private mediaProvider: MediaProvider
  ) {}

  ionViewDidLoad() {
    this.getAllFiles();
  }

  picArray: Pic[] = [];

  getAllFiles = () => {
    this.mediaProvider.getAllFiles().subscribe(res => {
      Promise.all(
        res.map(file =>
          this.mediaProvider.getSingleMedia(file.file_id).toPromise()
        )
      ).then(picArray => {
        this.picArray = picArray;
      });
    });
  };

  showFullImage = (item: Pic) => {
    this.photoViewer.show(
      `http://media.mw.metropolia.fi/wbma/uploads/${item.filename}`,
      item.title
    );
  };
}
