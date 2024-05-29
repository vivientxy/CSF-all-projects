import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrl: './cat.component.css'
})
export class CatComponent implements OnInit, OnDestroy {

  private readonly activatedRoute = inject(ActivatedRoute)
  sub$!: Subscription
  width = 100

  ngOnInit(): void {
    this.sub$ = this.activatedRoute.queryParams.subscribe(
      queryParams => {
        this.width = 100
        if (!!queryParams['size']) {
          this.width = parseInt(queryParams['size'])
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
  }


}
