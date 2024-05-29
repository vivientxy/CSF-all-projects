import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameInfo } from '../models';
import { GamesService } from '../games.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrl: './list-games.component.css'
})
export class ListGamesComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly router = inject(Router)
  private readonly gamesSvc = inject(GamesService)

  q = ''

  games: GameInfo[] = []

  games$!: Observable<GameInfo[]>
  gamesP$!: Promise<GameInfo[]>

  ngOnInit(): void {
    this.q = this.activatedRoute.snapshot.queryParams['q']
    if (!this.q) {
      this.router.navigate(['/'])
      return
    }

    this.gamesSvc.searchGamesByNameAsPromise(this.q)
      .then(result => this.games = result)
      .catch(error => alert('ERROR ' + JSON.stringify(error)))

    this.gamesP$ = this.gamesSvc.searchGamesByNameAsPromise(this.q)

    this.games$ = this.gamesSvc.searchGamesByName(this.q)
  }

}
