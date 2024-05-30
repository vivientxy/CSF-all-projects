import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { SearchResult, SearchResultSlice } from "./models";

const INIT_VALUE: SearchResultSlice = {
    results: []
}

@Injectable()
export class GiphyStore extends ComponentStore<SearchResultSlice> {
    
    constructor() { super(INIT_VALUE) }

    // reducer (updater)
    readonly saveResult = this.updater<SearchResult>(
        (currStore: SearchResultSlice, result: SearchResult) => {
            const newStore: SearchResultSlice = { ...currStore }
            newStore.results.push(result)
            return newStore
        }
    )

    // query / selector
    readonly getSavedSearches = this.select<string[]>(
        (currStore: SearchResultSlice) => {
            return currStore.results.map(result => result.q)
        }
    )

    readonly getFullSavedSearches = this.select<SearchResult[]>(
        (currStore: SearchResultSlice) => currStore.results
    )

    // closure. qText is free variable bound in the closure
    readonly getSavedSearchesByQ = (qText: string) => {
        return this.select<SearchResult | undefined>(
            (currStore: SearchResultSlice) => currStore.results.find(result => result.q == qText)
        )
    }

}
