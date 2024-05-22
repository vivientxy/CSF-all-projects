export class Task {
    description!: string;
    priority!: string;
    due!: Date;
    people!: { name: string }[];
    completed!: boolean;

    constructor(description: string, priority: string, due: Date, people: { name: string }[]) {
        this.description = description;
        this.priority = priority;
        this.due = due;
        this.people = people;
        this.completed = false;
    }
}
