import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface IUpload {
  title?: string;
  description?: string;
}

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage {
  upload: IUpload = {};
  image: any;
  file: any;

  changed = false;
  style = {
    brightness: 50,
    contrast: 50,
    saturation: 50,
    sepia: 0
  };
  filter = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mediaProvider: MediaProvider,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  handleFileChange = event => {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      this.showPreview(event.target.files[0]);
    }
  };

  handleStyleChange = () => {
    this.filter = `brightness(${this.style.brightness * 2}%) contrast(${this
      .style.contrast * 2}%) saturate(${this.style.saturation * 2}%) sepia(${
      this.style.sepia
    }%)`;

    this.changed = true;
  };

  showPreview = file => {
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  uploadFormSubmit = () => {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    const data = new FormData();
    data.append('title', this.upload.title);
    data.append('description', this.upload.description);
    data.append('file', this.file);

    const moveOn = () => {
      setTimeout(() => {
        loading.dismiss();
        this.navCtrl.pop().catch(console.error);
      }, 2000);
    };

    this.mediaProvider.upload(data).subscribe(res => {
      if (this.changed) {
        this.mediaProvider
          .addTag(res.file_id, `filter: ${this.filter}`)
          .subscribe(res2 => {
            moveOn();
          });
      } else {
        moveOn();
      }
    });
  };
}
