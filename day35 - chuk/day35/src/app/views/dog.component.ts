import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrl: './dog.component.css'
})
export class DogComponent implements OnInit, OnDestroy {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly router = inject(Router)
  private readonly title = inject(Title)

  dogImg = ''
  breed = ''
  sub$!: Subscription

  ngOnInit(): void {
    console.info('Entering component, onInit')
    // Save the subscription reference
    this.sub$ = this.activatedRoute.params.subscribe(
      params => {
        this.title.setTitle(this.breed)
        this.breed = params['breed']
        this.dogImg = `/assets/${this.breed}.jpg`
      }
    )
  }

  ngOnDestroy(): void {
    console.info('Leaving component, onDestroy')
    // Unsubscribe
    this.sub$.unsubscribe()
  }

  back() {
    this.router.navigate( ['/'] )
  }

}
