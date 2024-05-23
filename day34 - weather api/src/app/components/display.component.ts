import { Component, Input, OnChanges } from '@angular/core';
import { Weather } from '../models';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent {

  @Input()
  childWeather!: Weather

}
