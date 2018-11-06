import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { FavoritePage } from '../pages/favorite/favorite';
import { TalkUsPage } from '../pages/talk-us/talk-us';
import { AboutPage } from '../pages/about/about';


export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  active: boolean;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = HomePage;

  //papers: Array<any> = [];
  appPages: PageInterface[] = [
    { title: 'Início', name: 'HomePage', component: HomePage, icon: 'custom-home', active: false },
    { title: 'Cronograma', name: 'HomePage', component: HomePage, icon: 'custom-cronograma', active: false },
    { title: 'Pesquisa', name: 'SearchPage', component: SearchPage,   icon: 'custom-pesquisa', active: false },
    { title: 'Trabalhos Favoritos', name: 'Favorite', component: FavoritePage,   icon: 'custom-favoritos', active: false },
    { title: 'Fale Conosco', name: 'TalkUs', component: TalkUsPage,   icon: 'custom-contato', active: false },
    { title: 'Meus Dados', name: 'SearchPage', component: SearchPage,   icon: 'custom-configuracao', active: true },
    { title: 'Sobre', name: 'About', component: AboutPage,   icon: 'custom-informacao', active: false },
  ]

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, public http: HttpClient, private storage: Storage) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
