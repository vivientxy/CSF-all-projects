export class Task {
    description!: string;
    priority!: string;
    due!: Date;
    completed!: boolean;

    constructor(description: string, priority: string, due: Date) {
        this.description = description;
        this.priority = priority;
        this.due = due;
        this.completed = false;
    }
}
