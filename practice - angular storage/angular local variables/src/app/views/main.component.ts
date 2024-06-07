import { Component, OnInit, inject } from '@angular/core';
import { Observable, filter, find, tap } from 'rxjs';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  private readonly formInput = inject(AppComponent)

  cities: string[] = ['Singapore','Kuala Lumpur','Tokyo','Bangkok','Hong Kong','Beijing']
  newCity$!: Observable<string>

  ngOnInit(): void {
    this.newCity$ = this.formInput.onNewCity.asObservable()
    this.newCity$.pipe(
      filter(c => !this.doesCityExist(c)),
      tap(c => this.cities.push(c))
    ).subscribe()
  }

  private doesCityExist(city: string): boolean {
    return this.cities.findIndex(c => c == city) != -1
  }

  deleteCity(city: string) {
    const index = this.cities.findIndex(c => c == city)
    this.cities.splice(index,1)
  }

}