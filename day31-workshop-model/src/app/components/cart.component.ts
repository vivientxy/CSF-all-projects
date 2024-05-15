import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  @Input()
  fruitName: string = ''

  @Input()
  idx: number = 0

  @Output()
  remove = new Subject<number>()

  removeItem() {
    this.remove.next(this.idx)
  }

}
