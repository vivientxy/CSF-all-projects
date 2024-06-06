import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly svc = inject(EmployeeService);
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: this.fb.control<string>(''),
      lastName: this.fb.control<string>(''),
      email: this.fb.control<string>(''),
      profileUrl: this.fb.control<any>,
      picFile: this.fb.control('')
    });
  }

  submit() {
    // pass in FormData into http request payload (controller accepts multipart form)
    const formData = new FormData();

    const firstName = this.form.get('firstName')?.value
    const lastName = this.form.get('lastName')?.value
    const email = this.form.get('email')?.value
    const picFile = this.form.get('picFile')?.value

    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("email", email)
    formData.append("picFile", picFile)

    this.svc.addEmployee(formData);

    this.form.reset()

    // trigger http get request?? / display component OnInit / component store to have a browser storage of the backend database
    


  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        picFile: file
      })
    }
  }

}
