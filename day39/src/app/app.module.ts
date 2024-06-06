import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Bedroom1Component } from './components/bedroom1.component';
import { SignalService } from './signal.service';

@NgModule({
  declarations: [
    AppComponent,
    Bedroom1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SignalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
