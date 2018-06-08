import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;

  selectedDay: number = 0;
  expandHeight: number = 500;
  items: any = [];

  constructor(public navCtrl: NavController) {
    this.items = [
        {expanded: false},
        {expanded: false},
        {expanded: false},
        {expanded: false},
        {expanded: false},
        {expanded: false},
        {expanded: false},
        {expanded: false},
        {expanded: false}
    ];
  }
  slideChanged(item) {
    this.selectedDay = this.slides.getActiveIndex();
    console.log(item);
  }
  expandItem(item){
        this.items.map((listItem) => {
            if(item == listItem){
                listItem.expanded = !listItem.expanded;
            } else {
                listItem.expanded = false;
            }
            return listItem;
        });
    }
}
