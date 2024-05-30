import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GiphyStore } from '../giphy.store';
import { Observable, map } from 'rxjs';
import { SearchResult } from '../models';

@Component({
  selector: 'app-cached',
  templateUrl: './cached.component.html',
  styleUrl: './cached.component.css'
})
export class CachedComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly giphyStore = inject(GiphyStore)

  q = ''
  result$!: Observable<SearchResult | undefined>

  ngOnInit(): void {
    this.q = this.activatedRoute.snapshot.params['q']
    // this.result$ = this.giphyStore.getFullSavedSearches.pipe(
    //   //map(searches => searches.filter(s => s.q == this.q))
    //   map(searches => searches.find(s => s.q == this.q))
    // )
    this.result$ = this.giphyStore.getSavedSearchesByQ(this.q)
  }

}
