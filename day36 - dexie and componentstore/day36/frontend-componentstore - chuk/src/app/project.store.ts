import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Project, ProjectDatabase, ProjectInfo } from "./models";

const INIT_DB: ProjectDatabase = {
  projects: []
}

@Injectable()
export class ProjectStore extends ComponentStore<ProjectDatabase> {
  constructor() {
    super(INIT_DB)
  }

  // Updaters
  // Create a method to update the store
  readonly addNewProject = this.updater<Project>(
    (currStore: ProjectDatabase, newProject: Project) => {
      // How do I add newProject to store??
      // Copy the old store to the new store
      const newStore: ProjectDatabase = { ...currStore }
      newStore.projects.push(newProject)
      return newStore
    }
  )

  readonly getProjectInfo = this.select<ProjectInfo[]>(
    (currStore: ProjectDatabase) => {
      // How do I return ProjectInfo[]
      return currStore.projects.map(
        project => {
          return {
            id: project.id,
            projectName: project.projectName,
            taskCount: project.tasks.length
          } as ProjectInfo
        }
      )
    }
  )

  readonly getProjectCount = this.select<number>(
    (currStore: ProjectDatabase) => {
      return currStore.projects.length
    }
  )

}
