import { Component } from '@angular/core';
import { Inventory } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'day31-workshop-model';

  inventories: Inventory[] = [
    {
      url: '/assets/fruits/harold.png',
      name: 'harold'
    },
    {
      url: '/assets/fruits/tomato.png',
      name: 'tomato'
    },
    {
      url: '/assets/fruits/zucchini.png',
      name: 'zucchini'
    }
  ]

  fruits: string[] = []

  handleClick(text: string) {
    this.fruits.push(text)
  }

  handleRemove(index: number) {
    this.fruits.pop
  }

}
