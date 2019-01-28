import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { MediaProvider } from '../../providers/media/media';
import { IPic } from '../../interfaces/media';
import { Observable } from 'rxjs/Observable';
import { PipesModule } from '../../pipes/pipes.module';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    private photoViewer: PhotoViewer,
    public mediaProvider: MediaProvider,
    public pipesModule: PipesModule
  ) {}

  ionViewDidLoad() {
    this.getAllFiles();
  }

  picArray: Observable<IPic[]>;

  getAllFiles = () => {
    this.picArray = this.mediaProvider.getAllFiles();
  };

  showFullImage = (item: IPic) => {
    this.photoViewer.show(
      this.mediaProvider.mediaUploads + item.filename,
      item.title
    );
  };
}
