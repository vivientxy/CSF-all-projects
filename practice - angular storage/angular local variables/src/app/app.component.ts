import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  private readonly fb = inject(FormBuilder)

  form!: FormGroup
  onNewCity = new Subject<string>()

  ngOnInit(): void {
    this.form = this.fb.group({
      city: this.fb.control<string>('')
    })
  }

  addCity() {
    this.onNewCity.next(this.form.value['city'])
    this.form.reset()
  }

}
