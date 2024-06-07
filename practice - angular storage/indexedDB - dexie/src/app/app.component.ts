import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CityRepository } from './city.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  private readonly fb = inject(FormBuilder)
  private readonly repo = inject(CityRepository)
  form!: FormGroup

  ngOnInit(): void {
    this.form = this.fb.group({
      city: this.fb.control<string>('')
    })
  }

  addCity() {
    this.repo.addCity(this.form.value['city'])
    this.form.reset()
  }

}
