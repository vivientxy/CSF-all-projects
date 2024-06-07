import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Post } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  private readonly fb = inject(FormBuilder)
  private readonly http = inject(HttpClient)
  form!: FormGroup

  ngOnInit(): void {
      this.form = this.fb.group({
        comments: this.fb.control<string>(''),
        picture: new FormControl(null)
      })
  }

  onSubmit() {
    const post: Post = {
      comments: this.form.value['comments'],
      picture: this.form.value['picture']
    }
    console.log('>>> post object:', post)

    this.http.post<any>('/api/post', post)
      .subscribe(response => {
        console.log('>>> http response:', response)
      })
  }

  file: File | null = null;

  onFileChange(event: any) {
    this.file = event.target.files[0];
    this.form.patchValue({ picture: this.file });
  }

  // onSubmit() {
  //   if (this.file && this.comment) {
  //     const formData = new FormData();
  //     formData.append('comment', this.comment);
  //     formData.append('file', this.file);

  //     this.http.post('http://localhost:8080/upload', formData).subscribe(response => {
  //       console.log(response);
  //     });
  //   }
  // }
  
}
