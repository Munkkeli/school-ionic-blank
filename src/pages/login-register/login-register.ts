import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html'
})
export class LoginRegisterPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mediaProvider: MediaProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
  }

  viewRegister = false;

  login = {} as { username: string; password: string };
  register = {} as {
    username: string;
    email: string;
    full_name: string;
    password: string;
    re_password: string;
  };

  loginForm = () => {
    this.mediaProvider.login(this.login).subscribe(
      res => {
        this.mediaProvider.loggedIn = true;
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.login = {} as any;
        this.navCtrl.push(HomePage).catch(console.error);
        // TODO: Save to localStorage
      },
      error => {
        console.error(error);
      }
    );
  };

  registerForm = () => {
    if (this.register.password !== this.register.re_password) return;

    this.mediaProvider
      .checkUsername(this.register.username)
      .subscribe(resAvailable => {
        if (!resAvailable.available) return;

        delete this.register.re_password;

        this.mediaProvider.register(this.register).subscribe(
          resRegister => {
            this.login = {
              username: this.register.username,
              password: this.register.password
            };
            this.register = {} as any;
            this.viewRegister = false;
            this.loginForm();
          },
          error => {
            console.error(error);
          }
        );
      });
  };

  toggleViewRegister = () => {
    this.viewRegister = !this.viewRegister;
  };
}
