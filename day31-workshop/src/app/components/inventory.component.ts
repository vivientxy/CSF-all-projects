import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {

  @Input()
  imageUrl: string = ''

  fruitName: string = ''

  @Output()
  onFigureClicked = new Subject<string>()

  imageClicked() {
    this.fruitName = this.imageUrl.substring(15, this.imageUrl.length - 4).replace("_", " ")
    this.onFigureClicked.next(this.fruitName)
  }

}
