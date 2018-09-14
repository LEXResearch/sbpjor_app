import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { DescriptionPage } from '../description/description';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;

  selectedDay: number = 0;
  expandHeight: number = 500;
  items: Array<{open: boolean, colorDesc: any, color: any, hora: string, title: string, location: string, description: string, mesas: any }>;
  days: any = [];
  toggled: boolean = false;

  posts: any;


  constructor(public navCtrl: NavController, public http: Http, public storage: Storage) {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
    let options = new RequestOptions({ headers:headers});
    this.http.get("http://sbpjor.org.br/api/v1/conferencia", options).map(res => res.json()).subscribe(data => {
        console.log(data);
        this.posts = data;
    });
    // storage.get('cronograma').then((val) => {
    //   this.posts = val;
    // });

    this.toggled = false;
    this.items = [
        {
          open: false,
          colorDesc: {'background': '#ffe180'},
          color: {'background': 'linear-gradient(90deg, #ffe180 15px, #FFFFFF 15px)'},
          hora: "9h30",
          title: "Abertura",
          location: "Auditório Principal",
          description: "Evento de abertura do SBPJor",
          mesas: null,
        },
        {
          open: false,
          colorDesc: {'background': '#ffb98a'},
          color: {'background': 'linear-gradient(90deg, #ffb98a 15px, #FFFFFF 15px)'},
          hora: "10h30",
          title: "Sessão de Trabalhos 1",
          location: "Sala 1000",
          description: "Sessão de apresentação de trabalhos",
          mesas: [{ number: '5', title: "Questões teórico/metodológicas nas pesquisas sobre identidade e trabalho dos jornalistas", coord: true, trabs: [ {title: 'trab1', url: 'link bang', author: 'jaum'}] },
                  {number: '4',title: "Outra mesa", coord: true, trabs: [ {title: 'Trabalho 1', url: 'link bang', author: 'Fulano'}, {title: 'Trabalho 2', url: 'link bang', author: 'Bertrano'}]},
                  {number: '6',title: "Questões teórico/metodológicas nas pesquisas sobre identidade e trabalho dos jornalistas", coord: false, trabs: [ {title: 'trab1', url: 'link bang', author: 'jaum'}]}]
        },
        {
          open: false,
          colorDesc: {'background': '#f9ab70'},
          color: {'background': 'linear-gradient(90deg, #f9ab70 15px, #FFFFFF 15px)'},
          hora: "13h30",
          title: "Sessão de Trabalhos 2",
          location: "Sala 1001",
          description: "Grande descrição",
          mesas: [{ number: '1', title: "Titutlo 1", coord: true }, {number: '7',title: "Tit 2", coord: true }, {number: '8',title: "tittt3", coord: false}]
        },
        {
          open: false,
          colorDesc: {'background': '#f291a1'},
          color: {'background': 'linear-gradient(90deg, #f291a1 15px, #FFFFFF 15px)'},
          hora: "14h30",
          title: "Mesa Redonda",
          location: "Sala 1002",
          description: "Grande descrição",
          mesas: [{ number: '2', title: "Titutlo 1", coord: true }, {number: '11',title: "Tit 2", coord: true }, {number: '12',title: "tittt3", coord: false}]
        },
        {
          open: false,
          colorDesc: {'background': '#c098ea'},
          color: {'background': 'linear-gradient(90deg, #c098ea 15px, #FFFFFF 15px)'},
          hora: "16h30",
          title: "Sessão de Trabalhos 3",
          location: "Sala 1003",
          description: "Grande descrição",
          mesas: [{ number: '3', title: "Titutlo 1", coord: true }, {number: '13',title: "Tit 2", coord: true }, {number: '14',title: "tittt3", coord: false}]
        }
    ];
  }
  toggle() {
    this.toggled = !this.toggled;
  }
  slideChanged() {
    this.selectedDay = this.slides.getActiveIndex();
  }
  expandItem(item){
        this.items.map((listItem) => {
            if(item == listItem){
                listItem.open = !listItem.open;
            } else {
                listItem.open = false;
            }
            return listItem;
        });
  }
  itemTapped(event, item){
    this.navCtrl.push(DescriptionPage, {
      item: item
    });
  }
}
