import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { environment } from './environments/environment';
import { Giphy } from './models';

@Injectable()
export class GiphyService {

    private http = inject(HttpClient);
    onGiphy = new Subject<Giphy[]>()

    getGifs(search: string): Observable<Giphy[]> {
        const queryParams = new HttpParams()
        .set('q', search)
        .set('api_key', environment.giphyApiKey)
        .set('limit', 5);

        return this.http.get<Giphy[]>('https://api.giphy.com/v1/gifs/search', { params: queryParams })
            .pipe(
                map((result: any) => (result['data'] as any[]) // cast to an array
                    .map((value) => {
                        return {
                            url: value['images']['original']['url'],
                            title: value['title']
                        } as Giphy;
                    }) // Giphy[]
                ),
                tap(result => {this.onGiphy.next(result)})
            );
    }
}
