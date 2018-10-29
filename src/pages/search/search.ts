import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, Select, Platform } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
//import { DocumentViewer } from '@ionic-native/document-viewer';

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

  fileTransfer: FileTransferObject;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public platform: Platform,
  public modal: ModalController, public http: HttpClient, private file: File, private transfer: FileTransfer) {
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
        this.searchMode = "mesas";
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
      //here encoding path as encodeURI() format.
      let url = encodeURI(item.url);
      //here initializing object.
      this.fileTransfer = this.transfer.create();
      // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.
      fileTransfer.download(url, this.file.externalRootDirectory + "trabalho.pdf", true).then((entry) => {
          //here logging our success downloaded file path in mobile.
          console.log('download completed: ' + entry.toURL());
      }, (error) => {
          //here logging our error its easier to find out what type of error occured.
          console.log('download failed: ' + error);
      });
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
