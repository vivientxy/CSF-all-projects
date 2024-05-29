import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { GameDetails, GameInfo } from "./models";
import { Observable, firstValueFrom } from "rxjs";

@Injectable()
export class GamesService {

  private readonly http = inject(HttpClient)

  searchGamesByName(q: string): Observable<GameInfo[]> {
    const params = new HttpParams()
        .set('q', q)

    return this.http.get<GameInfo[]>('http://localhost:8080/api/search', { params })
  }

  searchGamesByNameAsPromise(q: string): Promise<GameInfo[]> {
    return firstValueFrom(this.searchGamesByName(q))
  }

  searchGameDetailsByGidAsPromise(gid: number): Promise<GameDetails> {
    return firstValueFrom(
      this.http.get<GameDetails>(`http://localhost:8080/api/game/${gid}`)
    )
  }

}
