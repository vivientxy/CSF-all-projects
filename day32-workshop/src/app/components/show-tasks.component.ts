import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../model/task';

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

  @Output()
  edit = new Subject<Task>()

  @Output()
  delete = new Subject<void>()

  editTask() {
    this.edit.next(new Task(this.description, this.priority, this.due))
  }

  deleteTask() {
    this.delete.next()
  }
  
}
