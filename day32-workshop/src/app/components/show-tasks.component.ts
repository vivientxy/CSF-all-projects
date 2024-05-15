import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrl: './show-tasks.component.css'
})
export class ShowTasksComponent {

  @Input()
  description!: string

  @Input()
  priority!: string

  @Input()
  due!: Date
  
}
