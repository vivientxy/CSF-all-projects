import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PolarBearService } from './polarbear.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  private readonly router = inject(Router)
  private readonly polarbearSvc = inject(PolarBearService)
  private readonly title = inject(Title)

  dogBreeds = [ 'mastiff', 'labrador' ]

  ngOnInit(): void {
    this.title.setTitle('Main')
  }

  polarbear() {
    this.polarbearSvc.image = "/assets/polarbear.jpeg"
    this.router.navigate(['/polarbear'])
  }

  bigCat() {
    const queryParams = { size: 300 }
    this.router.navigate([ '/cat' ], { queryParams })
  }
}
