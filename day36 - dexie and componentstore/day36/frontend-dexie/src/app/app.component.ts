import { Component, OnInit, inject } from '@angular/core';
import { ProjectRepository } from './project.repository';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  private readonly projectRepo = inject(ProjectRepository)
  count$!: Observable<number>

  ngOnInit(): void {
    this.count$ = this.projectRepo.onCount.asObservable()
  }
  
}
