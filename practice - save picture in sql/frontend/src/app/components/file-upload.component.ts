import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent implements OnInit {

  private readonly fb = inject(FormBuilder)
  private readonly http = inject(HttpClient)
  form!: FormGroup

  ngOnInit(): void {
    this.form = this.fb.group({
      file: this.fb.control<any>('',[Validators.required]),
      fileSource: this.fb.control('', [Validators.required])
    })
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    const formData = new FormData();
    const fileSourceValue = this.form.get('fileSource')?.value

    if (fileSourceValue !== null && fileSourceValue !== undefined)
      formData.append('picture', fileSourceValue)

    this.http.post('/api/S3/upload', formData)
      .subscribe(response => {
        console.log('>>> http response:', response)
        alert('File uploaded successfully!')
      })
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file
      })
    }
  }

}
