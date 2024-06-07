import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CityRepository } from '../city.repository';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  private readonly repo = inject(CityRepository)

  cities$!: Observable<string[]>

  ngOnInit(): void {
    this.cities$ = this.repo.onCities.asObservable()
    this.repo.emitCities()
  }

  deleteCity(city: string) {
    this.repo.deleteCity(city)
  }

}