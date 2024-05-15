import { Component } from '@angular/core';
import { Inventory } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'day31-workshop';

  imgs: string[] = [
      "/assets/fruits/acorn_squash.png",
      "/assets/fruits/apple.png",
      "/assets/fruits/bell_pepper.png",
      "/assets/fruits/blueberries.png",
      "/assets/fruits/broccoli.png",
      "/assets/fruits/carrot.png",
      "/assets/fruits/celery.png",
      "/assets/fruits/chili_pepper.png",
      "/assets/fruits/corn.png",
      "/assets/fruits/eggplant.png",
      "/assets/fruits/harold.png",
      "/assets/fruits/lettuce.png",
      "/assets/fruits/mushroom.png",
      "/assets/fruits/onion.png",
      "/assets/fruits/potato.png",
      "/assets/fruits/pumpkin.png",
      "/assets/fruits/radish.png",
      "/assets/fruits/squash.png",
      "/assets/fruits/strawberry.png",
      "/assets/fruits/sugar_snap.png",
      "/assets/fruits/tomato.png",
      "/assets/fruits/zucchini.png"
  ]

  fruits: string[] = [
  ]
  
  handleClick(text: string) {
    console.info('>>>> image clicked printed from app', text, new Date())
    this.fruits.push(text)
  }

  // inventories: Inventory[] = [
  //   {
  //     url: '/assets/fruits/harold.png',
  //     name: 'harold'
  //   },
  //   {
  //     url: '/assets/fruits/tomato.png',
  //     name: 'tomato'
  //   },
  //   {
  //     url: '/assets/fruits/zucchini.png',
  //     name: 'zucchini'
  //   }
  // ]
  
}
