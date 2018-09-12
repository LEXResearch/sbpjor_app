import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { Http, Headers, RequestOptions } from '@angular/http';
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
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  appPages: PageInterface[] = [
    { title: 'Início', name: 'HomePage', component: HomePage, icon: 'custom-home' },
    { title: 'Cronograma', name: 'HomePage', component: HomePage, icon: 'custom-cronograma' },
    { title: 'Pesquisa', name: 'SearchPage', component: SearchPage,   icon: 'custom-pesquisa' },
    { title: 'Trabalhos Favoritos', name: 'Favorite', component: FavoritePage,   icon: 'custom-favoritos' },
    { title: 'Fale Conosco', name: 'TalkUs', component: TalkUsPage,   icon: 'custom-contato' },
    { title: 'Meus Dados', name: 'SearchPage', component: SearchPage,   icon: 'custom-configuracao' },
    { title: 'Infos', name: 'About', component: AboutPage,   icon: 'custom-informacao' },
  ]

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, private storage: Storage,
    public http: Http) {
    this.initializeApp();
    this.checkActivities(storage);
  }
  // test if data is already in storage, otherwise call api
  checkActivities(storage){
    let headers = new Headers({
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json'
    });
    let options = new RequestOptions({ headers:headers});

    if(storage.ready()){
      this.http.get("/conferencia", options).map(res => res.json()).subscribe(data => {
          console.log(data);
          storage.set('cronograma', data);
      });
    }
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
