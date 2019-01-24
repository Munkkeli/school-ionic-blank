import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { MediaProvider } from '../../providers/media/media';
import { IPic } from '../../interfaces/media';

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

  picArray: IPic[] = [];

  getAllFiles = () => {
    this.mediaProvider.getAllFiles().subscribe(res => {
      Promise.all(
        res.map(async file =>
          this.mediaProvider.getSingleMedia(file.file_id).toPromise()
        )
      )
        .then(picArray => {
          this.picArray = picArray;
        })
        .catch(error => console.error(error));
    });
  };

  showFullImage = (item: IPic) => {
    this.photoViewer.show(
      `http://media.mw.metropolia.fi/wbma/uploads/${item.filename}`,
      item.title
    );
  };
}
