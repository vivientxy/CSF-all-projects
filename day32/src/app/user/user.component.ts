import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { nonWhiteSpace } from '../custom-validator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  userForm!: FormGroup
  foodArray!: FormArray

  user: User = new User('', '', '', [])
  food1!: FormGroup<any>

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.foodArray = this.fb.array<string>([])

    this.userForm = this.fb.group({
      firstname: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
      lastname: this.fb.control<string>('', [Validators.required]),
      email: this.fb.control<string>('', [Validators.required, Validators.email, nonWhiteSpace]),
      food: this.foodArray
    })
  }

  addNewFood() {
    this.food1 = this.fb.group({
      f1: this.fb.control<string>('')
    })
    this.foodArray.push(this.food1)
  }

  removeFood(index: number) {
    if (this.foodArray.length != 1) {
      this.foodArray.removeAt(index)
    }
  }

  processUserForm() {
    const userInfo = this.userForm.value

    console.log(">>> firstname: " + userInfo.firstname)
    console.log(">>> lastname: " + userInfo.lastname)
    console.log(">>> email: " + userInfo.email)

    for (var f of userInfo.food) {
      console.log(">>> food: " + f.f1)
    }

  }
}
