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
  mesa: any;
  items: any;
  filterItems: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mesa = navParams.get('mesa');
    if (this.mesa != null) {
      this.items = this.mesa.trabs;
      this.filterItems = this.items;
      this.searchMode = "mesas"
      console.log(this.items)
    } else {
      console.log("nops")
      // se nao vier nenhuma mesa como parametro, então pegamos todos os itens
      //this.items = "all";
      this.filterItems = this.items;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  onInput($event) {
    console.log(this.searchInput);
    switch (this.searchMode) {
      case "autor":{
        this.filterItems = this.items.filter((item) => {
          return item.title.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1;
        });
        break;
      }
      case "titulo":{
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
      case "mesas":{
        this.filterItems = this.items.filter((item) => {
          return item.title.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1;
        });
        break;
      }

    }

  }


}
