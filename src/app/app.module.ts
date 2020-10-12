import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CurrentRateModule } from '../shared/current-rate/current-rate.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CurrentRateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
