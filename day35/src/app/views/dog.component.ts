import { Component, OnDestroy, OnInit, inject } from '@angular/core';
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
  
  dogImg = ''
  breed = ''
  sub$!: Subscription

  ngOnInit(): void {
    console.info('Entering component, onInit')
    // this.breed = this.activatedRoute.snapshot.params['breed']
    // this.dogImg = `/assets/${this.breed}.jpg`

    this.activatedRoute.params.subscribe(
      params => {
        this.breed = params['breed']
        this.dogImg = `/assets/${this.breed}.jpg`
      }
    )
  }

  ngOnDestroy(): void {
    console.info('Leaving component, onDestroy')
    this.sub$.unsubscribe()
  }

  back() {
    this.router.navigate(['/'])
  }

}
