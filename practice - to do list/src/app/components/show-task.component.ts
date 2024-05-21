import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../models/task';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrl: './show-task.component.css'
})
export class ShowTaskComponent {

  @Input() 
  tasks: Task[] = []; // passed in from parent

  @Output() 
  edit = new EventEmitter<Task>();
  @Output() 
  delete = new EventEmitter<number>();
  @Output() 
  complete = new EventEmitter<number>();

  onEdit(task: Task) {
    this.edit.emit(task);
  }

  toDelete(idx: number) {
    this.delete.emit(idx)
  }

  onComplete(idx: number) {
    this.complete.emit(idx)
  }

}
