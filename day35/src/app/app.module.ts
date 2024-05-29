import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './views/main.component';
import { CatComponent } from './views/cat.component';
import { DogComponent } from './views/dog.component';
import { PolarbearComponent } from './views/polarbear.component';
import { PolarBearService } from './polarbear.service';

const appRoutes: Routes = [
  { path: '', component: MainComponent }, // this is equivalent of GET('/'), the index.html 
  { path: 'home', component: MainComponent },
  { path: 'cat', component: CatComponent },
  { path: 'polarbear', component: PolarbearComponent },
  { path: 'dog', component: DogComponent },
  { path: 'dog/:breed', component: DogComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' } // wildcard, last route - redirect to main
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CatComponent,
    DogComponent,
    PolarbearComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PolarBearService],
  bootstrap: [AppComponent]
})
export class AppModule { }
