import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../models/task';
import { Subject } from 'rxjs';
import { greaterThanToday } from '../validators/custom-validators';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit, OnChanges {

  taskForm!: FormGroup

  @Input()
  task: Task | null = null;

  @Output()
  taskSubmit = new EventEmitter<Task>();

  @Output()
  cancelEdit = new EventEmitter<void>();

  editMode: boolean = false
  hasErrors: boolean = false

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      description: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      priority: this.fb.control('', [Validators.required]),
      due: this.fb.control(new Date(), [Validators.required, greaterThanToday])
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      this.taskForm.patchValue(this.task);
      this.editMode = true
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskSubmit.emit(this.taskForm.value);
      this.taskForm.reset();
      this.editMode = false
      this.hasErrors = false
    } else {
      this.hasErrors = true
    }
  }

  cancelUpdate() {
    this.cancelEdit.emit();
    this.taskForm.reset();
    this.editMode = false
  }

}
