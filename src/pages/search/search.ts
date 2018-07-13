import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  searchMode: string = "autor";
  searchInput: string;
  items: Array<{open: boolean, color: any, hora: string, title: string, location: string, description: string, trab: boolean }>;
  filterItems: Array<{open: boolean, color: any, hora: string, title: string, location: string, description: string, trab: boolean }>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = [
        {
          open: false,
          color: {'background': 'linear-gradient(90deg, #ffe180 15px, #FFFFFF 15px)'},
          hora: "9h30",
          title: "Abertura",
          location: "Na frente de casa",
          description: "Grande descrição",
          trab: false
        },
        {
          open: false,
          color: {'background': 'linear-gradient(90deg, #ffb98a 15px, #FFFFFF 15px)'},
          hora: "10h30",
          title: "Ota Mesa",
          location: "Lado Esquerdo",
          description: "Grande descrição",
          trab: true
        },
        {
          open: false,
          color: {'background': 'linear-gradient(90deg, #f9ab70 15px, #FFFFFF 15px)'},
          hora: "13h30",
          title: "Ota Mesa com nome grande",
          location: "Do outro lado",
          description: "Grande descrição",
          trab: false
        },
        {
          open: false,
          color: {'background': 'linear-gradient(90deg, #f291a1 15px, #FFFFFF 15px)'},
          hora: "14h30",
          title: "Mesa Redonda",
          location: "Atrás",
          description: "Grande descrição",
          trab: false
        },
        {
          open: false,
          color: {'background': 'linear-gradient(90deg, #c098ea 15px, #FFFFFF 15px)'},
          hora: "16h30",
          title: "Fechadura",
          location: "Nome grande para tentar bugar",
          description: "Grande descrição",
          trab: true
        }
    ];
    this.filterItems = this.items;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  onInput($event) {
    switch (this.searchMode) {
      case "autor":{
        this.filterItems = this.items.filter((item) => {
          return item.title.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1;
        });
        break;
      }
      case "nome":{
        this.filterItems = this.items.filter((item) => {
          return item.title.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1;
        });
        break;
      }
      case "assunto":{
        this.filterItems = this.items.filter((item) => {
          return item.description.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1;
        });
        break;
      }
      case "sessao":{
        this.filterItems = this.items.filter((item) => {
          return item.title.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1;
        });
        break;
      }

    }

  }


}
