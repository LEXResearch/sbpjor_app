import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SearchPage } from '../search/search';

/**
 * Generated class for the DescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-description',
  templateUrl: 'description.html',
})
export class DescriptionPage {
  selectedItem: any;
  mesasMode: string = "livres";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = navParams.get('atividade');
  }
  mesasFilter(b){
    return this.selectedItem.mesas.filter((mesa) => {
      return mesa.coordenada == b;
    });
  }
  backButton(){
    this.navCtrl.pop();
  }
  pushButton(event, mesa){
    this.navCtrl.push(SearchPage, {
      mesa: mesa
    })
  }
  hora(data){
    return data.split("T")[1].split(":")[0];
  }
  min(data){
    return data.split("T")[1].split(":")[1];
  }
}
