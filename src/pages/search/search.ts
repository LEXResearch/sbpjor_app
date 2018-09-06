import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, Select } from 'ionic-angular';

import { Storage } from '@ionic/storage';

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

  searchMode: string = "autor";
  searchInput: string;
  mesa: any;
  items: any;
  filterItems: any;
  selectorOpen: false;
  eventsOptions: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
  public modal: ModalController) {
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
    this.storage.get('cronograma').then((val) => {
      console.log('Your age is', val);
    });

  }
  openModal() {
      this.select.open();
  }

  onInput($event) {
    //console.log(this.searchInput);
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
