import { Component, OnInit, inject } from '@angular/core';
import { ProjectStore } from './project.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  private readonly projectStore = inject(ProjectStore)

  count$!: Observable<number>

  ngOnInit(): void {
      this.count$ = this.projectStore.getProjectCount
  }
}
