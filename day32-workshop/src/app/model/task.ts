export class Task {
    description!: string
    priority!: string
    due!: Date
    id!: number
    status!: boolean

    constructor(description: string, priority: string, due: Date, id: number, status: boolean) {
        this.description = description
        this.priority = priority
        this.due = due
        this.id = id
        this.status = status
    }
}
