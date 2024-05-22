import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../models/task';
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
      due: this.fb.control(new Date(), [Validators.required, greaterThanToday]),
      people: this.fb.array([])
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      // ensure there's a correct number of formArray fields
      this.people.clear();
      for (let index = 0; index < this.task.people.length; index++) {
        this.addPerson()
      }
      this.taskForm.patchValue(this.task);
      this.editMode = true;
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      // remove all blank persons
      for (let index = 0; index < this.people.length; index++) {
        let name : string = this.people.at(index).value;
        if (name.trim().length == 0) {
          this.people.removeAt(index)
          index --
        }
      }

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

  get people() {
    return this.taskForm.get('people') as FormArray;
  }
  
  addPerson() {
    this.people.push(this.fb.control(''));
  }

  removePerson(idx: number) {
    this.people.removeAt(idx)
  }

}
