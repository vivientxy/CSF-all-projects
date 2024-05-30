import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './views/main.component';
import { SearchComponent } from './views/search.component';
import { CachedComponent } from './views/cached.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { GiphyService } from './giphy.service';
import { GiphyStore } from './giphy.store';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'search', component: SearchComponent },
  { path: 'cached/:q', component: CachedComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SearchComponent,
    CachedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {useHash: true})  // for routing when refresh, allows for deep linking
  ],
  providers: [GiphyService, GiphyStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
