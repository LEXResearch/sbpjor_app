import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the FavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {
  trabalhos: Array<{id: number, titulo: string, url: string, autores: any, favorito: boolean, evento: number }>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.trabalhos = [];
    this.storage.get('trabalhos').then((val) => {
      this.trabalhos = val;
    });
  }
  // function to remove from Favoritos


  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritePage');
  }
  favItem(item){
    const index = this.trabalhos.indexOf(item, 0);
    if (index > -1) {
       this.trabalhos.splice(index, 1);
    }
    this.storage.set('favoritos', this.trabalhos);
  }

  favoritos(trabalhos) {
    return trabalhos.filter((item) => {
       return item.favorito == true;
    });
  }
  // download(titulo, url) {
  //   const fileTransfer: FileTransferObject = this.transfer.create();
  //   fileTransfer.download(url, this.file.dataDirectory + titulo + '.pdf').then((entry) => {
  //     console.log('download complete: ' + entry.toURL());
  //   }, (error) => {
  //     // handle error
  //   });
  // }

}
