import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { environment } from './environments/environment';
import { Weather } from './models';

@Injectable()
export class HttpService {
    
  private readonly http = inject(HttpClient);

  // https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}
  getWeather(city: string): Promise<any> {
    const headers = new HttpHeaders()
        .set('Content-Type', 'applicaton/x-www-form-urlencoded');

    const params = new HttpParams()
        .set('q', city)
        .set('appid', environment.weatherApiKey);

    return firstValueFrom<string>(
      this.http.get<any>('/api/data/2.5/weather', { params, headers })
        .pipe(map(result => result['weather'][0]))
    );
  }
}
