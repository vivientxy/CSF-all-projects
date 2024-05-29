import { Component, OnInit, inject } from '@angular/core';
import { PolarBearService } from '../polarbear.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-polarbear',
  templateUrl: './polarbear.component.html',
  styleUrl: './polarbear.component.css'
})
export class PolarbearComponent implements OnInit {

  private readonly router = inject(Router)
  private readonly fb = inject(FormBuilder)
  private readonly polarbearSvc = inject(PolarBearService)

  image = ""
  form!: FormGroup

  ngOnInit(): void {
    if (!this.polarbearSvc.image)
      this.router.navigate(['/'])
    else
      this.image = this.polarbearSvc.image

    this.form = this.fb.group({
      email: this.fb.control<string>('', [Validators.required, Validators.email])
    })
  }

  isFormDirty() {
    return this.form.dirty
  }

  subscribe() {
    this.form.reset()
    this.router.navigate(['/'])
  }
  
}
