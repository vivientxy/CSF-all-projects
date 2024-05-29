import { Component, OnInit, inject } from '@angular/core';
import { ProjectRepository } from '../project.repository';
import { ProjectInfo } from '../models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  private readonly projectRepo = inject(ProjectRepository)
  projectInfo: ProjectInfo[] = []
  projectInfo$!: Promise<ProjectInfo[]>

  ngOnInit(): void {
    
    // this.projectRepo.projectCol.toArray()
    //   .then(projects => {
    //     this.projectInfo = projects.map(p => {
    //       return {
    //         id: p.id,
    //         projectName: p.projectName,
    //         taskCount: p.tasks.length
    //       } as ProjectInfo
    //     })
    //   })

      this.projectInfo$ = this.projectRepo.projectCol.toArray()
        .then(projects => {
          return projects.map(p => {
            return {
              id: p.id,
              projectName: p.projectName,
              taskCount: p.tasks.length
            } as ProjectInfo
          })
        })
  }

  deleteProject(projId: string) {
    this.projectRepo.projectCol.delete(projId)
      .then(result => {
        console.info('>>> deleted:', projId)
      })
  }

}
