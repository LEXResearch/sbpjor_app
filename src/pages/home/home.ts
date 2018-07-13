import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular';

import { DescriptionPage } from '../description/description';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;

  selectedDay: number = 0;
  expandHeight: number = 500;
  items: Array<{open: boolean, color: any, hora: string, title: string, location: string, description: string, trab: boolean }>;
  days: any = [];
  toggled: boolean = false;


  constructor(public navCtrl: NavController) {
    this.toggled = false;
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
