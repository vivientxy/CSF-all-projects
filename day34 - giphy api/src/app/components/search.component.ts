import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GiphyService } from '../giphy.service';
import { Giphy } from '../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit, OnDestroy {

  private fb = inject(FormBuilder)
  private gifSvc = inject(GiphyService)
  gifForm!: FormGroup
  sub$!: Subscription
  gifs!: Giphy[]

  ngOnInit(): void {
    this.gifForm = this.fb.group({
      search: this.fb.control<string>('')
    })
  }

  processForm() {
    this.sub$ = this.gifSvc.getGifs(this.gifForm.value['search']).subscribe({
      next: (value) => {console.log('>>> value:', value)},
      error: (error) => {console.error('>>> ERROR', error)}
    })
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
  }

}
