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
  ) {
    mediaProvider.getAllFiles().subscribe(res => {
      this.picArray = res.map(file => mediaProvider.getMediaFile(file));
    });
  }

  picArray: Pic[] = [];

  showFullImage = (item: Pic) => {
    this.photoViewer.show(item.original, item.title);
  };
}
