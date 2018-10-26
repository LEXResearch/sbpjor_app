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
}

export interface TrabalhosInterface {
	numero: number;
	titulo: string; 
	url: string;
	autores: string;
	favorito: boolean;
	evento: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = HomePage;

  trabalhos: Array<TrabalhosInterface>;

  cronograma: Array<{titulo: string, descricao: string, local: string, data: any, open: boolean, cor_hex: any, cor_nome: any, cor_background: any,
    hora: any, categoria: number, mesas: Array<{titulo: string, coordenada: boolean,
    trabalhos: Array<{numero: number, titulo: string, url: string, autores: any, favorito: boolean}>}>}>;
	
  //papers: Array<any> = [];
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
    public splashScreen: SplashScreen, public http: HttpClient, private storage: Storage) {
    this.initializeApp();

    this.cronograma = [];
    this.trabalhos = [];

    this.http.get('https://sbpjor-lex.herokuapp.com/cronogramas/?format=json').subscribe(data =>{
      this.cronograma = data[0].atividades;
      storage.set('cronograma', this.cronograma);
    });

    this.http.get<TrabalhosInterface[]>('https://sbpjor-lex.herokuapp.com/trabalhos/?format=json').subscribe(data =>{
      console.log(data);
      this.trabalhos = data;
      storage.set('trabalhos', this.trabalhos);
    });

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
