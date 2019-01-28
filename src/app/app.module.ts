import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { LoginRegisterPage } from '../pages/login-register/login-register';
import { LogoutPage } from '../pages/logout/logout';
import { MediaProvider } from '../providers/media/media';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [MyApp, HomePage, MenuPage, LoginRegisterPage, LogoutPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, MenuPage, LoginRegisterPage, LogoutPage],
  providers: [
    StatusBar,
    SplashScreen,
    PhotoViewer,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MediaProvider
  ]
})
export class AppModule {}
