import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map, tap } from 'rxjs';
import { Weather } from '../models';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  city = '';
  weather!: Weather;

  ngOnInit(): void {
    this.city = this.activatedRoute.snapshot.params['city'];
    this.getWeatherData(this.city);
  }

  getWeatherData(city: string): Promise<Weather> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', '')
      .set('units', 'metric');

    return firstValueFrom(
      this.http
        .get<any>('https://api.openweathermap.org/data/2.5/weather', { params })
        .pipe(
          map((data) => {
            return {
              icon: `https://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png`,
              main: data['weather'][0]['main'],
              description: data['weather'][0]['description'],
              feelsLike: data['main']['feels_like'],
            } as Weather;
          }),
          tap((w) => (this.weather = w))
        )
    );
  }
}
