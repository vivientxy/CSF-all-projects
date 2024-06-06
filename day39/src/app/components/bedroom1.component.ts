import { Component, OnInit, inject } from '@angular/core';
import { SignalService } from '../signal.service';

@Component({
  selector: 'app-bedroom1',
  templateUrl: './bedroom1.component.html',
  styleUrl: './bedroom1.component.css'
})
export class Bedroom1Component implements OnInit {

  public readonly svc = inject(SignalService)

  ngOnInit(): void {
    // this.counter = 0;
  }

  increase() {
    // this.counter++;
    this.svc.updateCounter();
  }

}
