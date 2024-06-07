export type Task = {
  taskName: string
  dueDate: string
}
export type Project = {
  id: string
  projectName: string
  tasks: Task[]
}
export type ProjectInfo = {
  id: string
  projectName: string
  taskCount: number
}