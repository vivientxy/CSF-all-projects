import { Component } from '@angular/core';
import { Weather } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'day34';

  parentWeather: Weather = new Weather

  displayWeather(weather: Weather) {
    this.parentWeather = weather
    console.log('this is in parent component', weather)
  }

}
