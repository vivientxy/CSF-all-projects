export interface SearchResult {
    q: string
    urls: string[]
    date: number
}

export interface SearchResultSlice {
    results: SearchResult[]
}
