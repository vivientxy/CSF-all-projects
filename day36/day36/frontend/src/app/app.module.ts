import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './views/main.component';
import { TaskComponent } from './views/task.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { ProjectRepository } from './project.repository';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'task', component: TaskComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent, TaskComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ProjectRepository],
  bootstrap: [AppComponent]
})
export class AppModule { }
