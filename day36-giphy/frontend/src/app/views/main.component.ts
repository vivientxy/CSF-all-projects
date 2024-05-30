import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GiphyStore } from '../giphy.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  private readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)
  private readonly giphyStore = inject(GiphyStore)

  protected searchForm!: FormGroup
  protected savedSearches$!: Observable<string[]>

  ngOnInit(): void {
    this.searchForm = this.createSearchForm()
    this.savedSearches$ = this.giphyStore.getSavedSearches
  }

  private createSearchForm(): FormGroup {
    return this.fb.group({
      q: this.fb.control('', [Validators.required])
    })
  }

  search() {
    const values = this.searchForm.value
    console.info('>>> values:', values)
    const queryParams = {q: values['q']}
    this.router.navigate(['/search'], {queryParams})
  }

}
