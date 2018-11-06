import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, Select, Platform, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { HttpClient } from '@angular/common/http';

import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  @ViewChild(Select) select: Select;

  searchMode: string = "geral";
  searchInput: string;
  mesa: any;
  filterItems: any;
  selectorOpen: false;
  eventsOptions: any;

  trabalhos: Array<any> = [];
  cronograma: Array<any> = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public platform: Platform,
  public modal: ModalController, public alertCtrl: AlertController, public http: HttpClient, private iab: InAppBrowser) {
    this.cronograma = [];
    this.trabalhos = [];
    this.eventsOptions = [
      0, 1, 2
    ];

    this.mesa = navParams.get('mesa');

    storage.get('cronograma').then((val) => {
      this.cronograma = val;
    });

    storage.get('trabalhos').then((val) => {
      this.trabalhos = val;
      if (this.mesa != null) {
        for(var x in this.trabalhos) {
          this.mesa.trabalhos.map((trab) => {
              if(trab.numero == this.trabalhos[x].numero){
                  trab.favorito = this.trabalhos[x].favorito;
              }
          });
        }
        this.filterItems = this.mesa.trabalhos;
      } else {
        this.searchMode = "geral";
        storage.get('trabalhos').then((val) => {
          this.trabalhos = val;
          this.filterItems = val;
        });
      }
    });
  }

  openModal() {
     this.select.open();
  }

  favItem(item){
    const index = this.trabalhos.indexOf(item, 0);
    if (index > -1) {
      this.trabalhos[index].favorito = !this.trabalhos[index].favorito;
    } else {
		if(this.mesa != null) {
			const index = this.mesa.trabalhos.indexOf(item, 0);
			if (index > -1) {
				this.mesa.trabalhos[index].favorito = !this.mesa.trabalhos[index].favorito;
				this.trabalhos.map((trab) => {
					if(trab.numero == this.mesa.trabalhos[index].numero){
						trab.favorito = this.mesa.trabalhos[index].favorito;
					}
				});
			}
		}

    }
    this.storage.set('trabalhos', this.trabalhos);
  }

  download(item) {
    var browser = this.iab.create(item.url, '_system');
  }

  onInput($event) {
    //console.log(this.searchInput);
    switch (this.searchMode) {
      case "autor":{
        this.filterItems = this.trabalhos.filter((item) => {
          return item.autores.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1;
        });
        break;
      }
      case "titulo":{
        this.filterItems = this.trabalhos.filter((item) => {
          return item.titulo.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1;
        });
        break;
      }
      case "geral":{
        this.filterItems = this.trabalhos.filter((item) => {
          return item.titulo.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1 ||
          item.autores.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1
        });
        break;
      }
      case "mesas":{
        this.filterItems = this.trabalhos.filter((item) => {
          return item.titulo.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1;
        });
        break;
      }
    }
  }
}
