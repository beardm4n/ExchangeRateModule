import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentRateComponent } from './current-rate/current-rate.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [CurrentRateComponent],
  exports: [CurrentRateComponent],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class CurrentRateModule { }
