import { Component } from '@angular/core';
import { Task } from './model/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'day32-workshop';

  tasks: Task[] = [new Task("Hello World!", "low", new Date())]

  addTask(task: Task) {
    this.tasks.push(task)
  }

}
