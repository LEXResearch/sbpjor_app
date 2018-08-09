import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';

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
    { title: 'Trabalhos Favoritos', name: 'SearchPage', component: SearchPage,   icon: 'custom-favoritos' },
    { title: 'Fale Conosco', name: 'SearchPage', component: SearchPage,   icon: 'custom-contato' },
    { title: 'Meus Dados', name: 'SearchPage', component: SearchPage,   icon: 'custom-configuracao' },
    { title: 'Infos', name: 'SearchPage', component: SearchPage,   icon: 'custom-informacao' },
  ]

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
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
