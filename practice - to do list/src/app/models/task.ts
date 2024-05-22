export class Task {
    description!: string;
    priority!: string;
    due!: Date;
    people!: string[];
    completed!: boolean;

    constructor(description: string, priority: string, due: Date, people: string[]) {
        this.description = description;
        this.priority = priority;
        this.due = due;
        this.people = people;
        this.completed = false;
    }
}
