import { Component } from '@angular/core';

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
  ]

  fruits: string[] = [
  ]

  handleClick(text: string) {
    console.info('>>>> image clicked printed from app', text, new Date())
    this.fruits.push(text)
    console.info('>>>> ', this.fruits)
  }
}
