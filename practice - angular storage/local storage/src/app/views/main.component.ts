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

  cities: string[] = []
  newCity$!: Observable<string>

  ngOnInit(): void {
    const cityList = localStorage.getItem('cities')
    if (cityList)
      this.cities = cityList.split(',')
    else
      this.cities = ['singapore','kuala lumpur','tokyo','bangkok','hong kong','beijing']
    
    this.newCity$ = this.formInput.onNewCity.asObservable()
    this.newCity$.pipe(
      filter(c => !this.doesCityExist(c)),
      tap(c => {
        this.cities.push(c.toLowerCase())
        localStorage.setItem('cities', this.cities.toString())
      })
    ).subscribe()
  }

  private doesCityExist(city: string): boolean {
    return this.cities.findIndex(c => c == city.toLowerCase()) != -1
  }

  deleteCity(city: string) {
    const index = this.cities.findIndex(c => c == city)
    this.cities.splice(index,1)
    localStorage.setItem('cities', this.cities.toString())
  }

}