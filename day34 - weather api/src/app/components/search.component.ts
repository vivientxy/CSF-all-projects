import { Component, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../http.service';
import { Subject } from 'rxjs';
import { Weather } from '../models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  form!: FormGroup

  @Output()
  weather = new Subject<Weather>()

  private fb = inject(FormBuilder)
  private httpSvc = inject(HttpService)

  ngOnInit(): void {
    this.form = this.fb.group({
      city: this.fb.control('')
    })
  }

  process() {
    let city = this.form.value['city']
    
    this.httpSvc.getWeather(city)
      .then(result => {
        let w = new Weather()
        w.city = city
        w.icon = `https://openweathermap.org/img/wn/${result['icon']}@2x.png`
        w.main = result['main']
        w.description = result['description']
        this.weather.next(w)
      })
      .catch(error => console.log('>>> catch:', error))
  }

}
