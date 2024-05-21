import { Component, Output } from '@angular/core';
import { Task } from './model/task';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'day32-workshop';

  tasks: Task[] = [new Task("Hello World!", "low", new Date())]

  @Output()
  startEdit = new Subject<Task>()

  addTask(task: Task) {
    this.tasks.push(task)
  }

  editTask(idx: number, task: Task) {
    console.log("triggered edit task in parent")
    this.startEdit.next(task)
    // this.tasks.splice(idx, 1)
  }

  deleteTask(idx: number) {
    this.tasks.splice(idx, 1)
  }

}
