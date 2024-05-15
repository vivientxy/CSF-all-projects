import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-skills',
  templateUrl: './user-skills.component.html',
  styleUrl: './user-skills.component.css'
})
export class UserSkillsComponent implements OnInit {

  skillForm!: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.skillForm = this.fb.group({
      name: '',
      skills: this.fb.array([])
    })
  }

  getSkills() : FormArray {
    return this.skillForm.get('skills') as FormArray
  }

  addSkill() {
    this.getSkills().push(this.newSkill())
  }

  newSkill() : FormGroup {
    return this.fb.group({
      skillname: '',
      experience: ''
    })
  }

  removeSkill(index: number) {
    this.getSkills().removeAt(index)
  }

  onSubmit() {
    console.log("<<< " + this.skillForm.value)
  }

}
