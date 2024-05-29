import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PolarBearService } from '../polarbear.service';

@Component({
  selector: 'app-polarbear',
  templateUrl: './polarbear.component.html',
  styleUrl: './polarbear.component.css'
})
export class PolarbearComponent implements OnInit, OnDestroy {

  private readonly polarbearSvc = inject(PolarBearService)
  image = ""

  ngOnInit(): void {
    this.image = this.polarbearSvc.image
  }
  
  ngOnDestroy(): void {
    
  }
}
