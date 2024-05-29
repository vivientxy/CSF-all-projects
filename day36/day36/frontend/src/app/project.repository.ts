import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { Project } from "./models";

@Injectable()
export class ProjectRepository extends Dexie {

    projectCol!: Dexie.Table<Project, string>   // type is Project model, primary key (id) is a string

    constructor() {
        // create database
        super('project')
        // create tables
        this.version(1).stores({
            project: 'id' // primary key
        })
        // link to variable outside of constructor
        this.projectCol = this.table('project')
    }


}