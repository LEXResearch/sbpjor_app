import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

//import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { DescriptionPage } from '../description/description';

export interface TrabalhosInterface {
	numero: number;
	titulo: string;
	url: string;
	autores: string;
	favorito: boolean;
	evento: any;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Slides) slides: Slides;

  expandHeight: number = 500;
  //items: Array<{open: boolean, colorHEX: any, colorName: any, color: any, hora: string, title: string, location: string, description: string, mesas: any }>;
  toggled: boolean = false;
  //posts: Array<any> = [];
  selectedDay: number = 0;
  trabalhos: Array<{numero: number, titulo: string, url: string, autores: any, favorito: boolean, evento: number }> = [];

  cronograma: Array<{titulo: string, descricao: string, local: string, data: any, open: boolean, cor_hex: any, cor_nome: any, cor_background: any,
    hora: any, categoria: number, mesas: Array<{titulo: string, coordenada: boolean,
    trabalhos: Array<{numero: number, titulo: string, url: string, autores: any, favorito: boolean}>}>}> = [];

    data: any;
  // papers contem todos os Trabalhos, aqui diz se é favorito ou não
  // cronograma contem o cronograma baseado nos papers

  constructor(public navCtrl: NavController, public storage: Storage, public http: HttpClient) {
    this.cronograma = [];

    this.storage.get('cronograma').then((val) => {
      this.cronograma = val;
      this.cronograma.sort((item1, item2) => {
        var h1 = item1.hora.split('T')[1].split(":")[0];
        var h2 = item2.hora.split('T')[1].split(":")[0];
        if (h1 > h2) {
            return 1;
        }
        if (h1 < h2) {
            return -1;
        }
        return 0;
      });
    });

    this.storage.get('data').then((val) => {
      if(val == null){ // se não tiver um cronograma ainda, chama api
        this.http.get('https://sbpjor-lex.herokuapp.com/cronogramas/?format=json').subscribe(data =>{
          this.data = data[0].data;
          this.cronograma = data[0].atividades;
          storage.set('cronograma', this.cronograma);
          storage.set('data', this.data);
          console.log("no data");

          this.cronograma.sort((item1, item2) => {
            var h1 = item1.hora.split('T')[1].split(":")[0];
            var h2 = item2.hora.split('T')[1].split(":")[0];
            if (h1 > h2) {
                return 1;
            }
            if (h1 < h2) {
                return -1;
            }
            return 0;
          });
        });
        this.http.get<TrabalhosInterface[]>('https://sbpjor-lex.herokuapp.com/trabalhos/?format=json').subscribe(data =>{
          this.trabalhos = data;
          storage.set('trabalhos', this.trabalhos);
        });
      } else { // se já tiver, verifica se o cronograma n foi atualizado
        this.http.get('https://sbpjor-lex.herokuapp.com/cronogramas/?format=json').subscribe(data =>{
          this.storage.get('cronograma').then((cro) => {
            this.cronograma = cro;
            if(data[0].data != val){
              this.cronograma = data[0].atividades;
              this.http.get<TrabalhosInterface[]>('https://sbpjor-lex.herokuapp.com/trabalhos/?format=json').subscribe(trab =>{
                this.trabalhos = trab;
                for(var x in this.trabalhos){
                  if(this.trabalhos[x].favorito){
                    trab[x].favorito = this.trabalhos[x].favorito;
                    console.log("é favorito");
                  }
                }
                this.trabalhos = trab;
              });
              storage.set('trabalhos', this.trabalhos);
              storage.set('cronograma', this.cronograma);
              storage.set('data', this.data);
            } else {
              console.log("iguais");
            }

            this.cronograma.sort((item1, item2) => {
              var h1 = item1.hora.split('T')[1].split(":")[0];
              var h2 = item2.hora.split('T')[1].split(":")[0];
              if (h1 > h2) {
                  return 1;
              }
              if (h1 < h2) {
                  return -1;
              }
              return 0;
            });

          });
          // this.cronograma = data[0].atividades;
          // storage.set('cronograma', this.cronograma);
        });
      }
    });
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  slideChanged() {
    this.selectedDay = this.slides.getActiveIndex();
  }

  cor(atividade){
    return {'background': 'linear-gradient(90deg, '+ atividade.cor_hex +' 15px, #FFFFFF 15px)'};
  }

  expandItem(item){
        this.cronograma.map((listItem) => {
            if(item == listItem){
                listItem.open = !listItem.open;
            } else {
                listItem.open = false;
            }
            return listItem;
        });
  }

  itemTapped(event, atividade){
    this.navCtrl.push(DescriptionPage, {
      atividade: atividade
    });
  }

  hora(item){
    return item.hora.split('T')[1].split(":")[0];
  }

  cronogramaByDay(day){
    return this.cronograma.filter((item) => {
      if (item.data != null)
       return item.data.split('-')[2] == day;
    });
  }
}
