import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-my-image',
  templateUrl: './my-image.component.html',
  styleUrl: './my-image.component.css'
})
export class MyImageComponent {

  @Input()
  imageUrl: string = '/assets/huhcat.png' // default value

  @Input()
  imageCaption: string = 'huh?'

  counter: number = 0

  @Output()
  onFigureClicked = new Subject<string>()

  imageClicked(abc: any) {
    console.info('>>>> image clicked', abc, new Date())
    this.counter++
    this.onFigureClicked.next(this.imageCaption)
  }

}
