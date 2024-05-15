export class User {
    lastname!: string
    firstname!: string
    email!: string
    food!: string[]

    constructor(lastname: string, firstname: string, email: string, food: string[]) {
        this.lastname = lastname
        this.firstname = firstname
        this.email = email
        this.food = food
    }
}