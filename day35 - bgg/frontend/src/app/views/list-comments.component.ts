import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { GameComment, GameDetails } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom, tap } from 'rxjs';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrl: './list-comments.component.css'
})
export class ListCommentsComponent implements OnInit, OnDestroy {
  
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly router = inject(Router)
  private readonly http = inject(HttpClient)
  private readonly gameSvc = inject(GamesService)

  gid!: number
  gameP$!: Promise<GameDetails>

  game!: GameDetails

  ngOnInit(): void {
    this.gid = this.activatedRoute.snapshot.params['gid'];
    if (!this.gid) {
      this.router.navigate(['/'])
      return
    }

    this.gameP$ = 

    console.log('this.gameP$', this.gameP$)
  }

  ngOnDestroy(): void {
    
  }

}
