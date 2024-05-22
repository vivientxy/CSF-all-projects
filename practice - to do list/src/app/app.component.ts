import { Component, Output } from '@angular/core';
import { Task } from './models/task';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todolist';

  tasks: Task[] = [
    // new Task('hello','low',new Date(), [{name:'amy'},{name:'brian'},{name:'cheri'}]), 
    new Task('hello','low',new Date(),['amy','brian','cheri']), 
    new Task('konnichiwa','medium',new Date(),[])
  ];
  
  selectedTask: Task | null = null;

  addTask(task: Task) {
    console.log('>>>', task)
    if (this.selectedTask) {
      // Update existing task
      const idx = this.tasks.indexOf(this.selectedTask);
      this.tasks[idx] = task;
    } else {
      // Add new task
      this.tasks.push(task);
    }
    this.selectedTask = null;
  }

  processEdit(task: Task) {
    this.selectedTask = task;
  }

  processCancel() {
    this.selectedTask = null;
  }

  processDelete(idx: number) {
    this.tasks.splice(idx,1);
  }

  processComplete(idx: number) {
    let t = this.tasks.at(idx) as Task
    t.completed = !t.completed
    this.tasks[idx] = t;
  }

}
