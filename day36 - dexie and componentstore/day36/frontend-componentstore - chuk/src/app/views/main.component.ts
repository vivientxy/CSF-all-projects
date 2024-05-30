import { Component, OnInit, inject } from '@angular/core';
import { ProjectStore } from '../project.store';
import { Observable } from 'rxjs';
import { ProjectInfo } from '../models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  private readonly projectStore = inject(ProjectStore)

  projectInfo$!: Observable<ProjectInfo[]>

  ngOnInit(): void {
    this.projectInfo$ = this.projectStore.getProjectInfo
  }

}
