import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Giphy } from '../models';
import { GiphyService } from '../giphy.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit, OnDestroy {

  private gifSvc = inject(GiphyService)
  sub$!: Subscription
  gifs: Giphy[] = []

  ngOnInit(): void {
    this.sub$ = this.gifSvc.onGiphy.subscribe(
      result => this.gifs = result
    )
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
  }

}
