import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { SearchResult } from "./models";
import { firstValueFrom, map } from "rxjs";

@Injectable()
export class GiphyService {

    private readonly http = inject(HttpClient)

    search(q: string): Promise<SearchResult> {
        const params = new HttpParams()
            .set("q", q)

        // work with Observable
        return firstValueFrom(this.http.get<string[]>('/api/search', {params})
            .pipe(
                map((urls: string[]) => {
                    return {
                        q, urls,
                        date: (new Date()).getTime()
                    } as SearchResult
                })
            )
        )

        // // work with Promise
        // return firstValueFrom(
        //     this.http.get<string[]>('/api/search', {params})
        // ).then((urls: string[]) => {
        //     return {
        //         q,
        //         urls,
        //         date: (new Date()).getTime()
        //     } as SearchResult
        // })

        
    }
}