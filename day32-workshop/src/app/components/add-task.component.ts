import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { lessThanToday } from '../validations/custom-validation';
import { Task } from '../model/task';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {

  taskForm!: FormGroup

  @Output()
  outputTask = new Subject<Task>()

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      priority: ['', Validators.required],
      due: [new Date, lessThanToday]
    })
  }

  onSubmit() {
    console.log('>>>> ', this.taskForm.value)
    this.outputTask.next(this.taskForm.value as Task)
  }

}
