import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrentRateService } from '../current-rate.service';
import { takeWhile } from "rxjs/operators";

@Component({
  selector: 'app-current-rate',
  templateUrl: './current-rate.component.html',
  styleUrls: ['./current-rate.component.scss']
})
export class CurrentRateComponent implements OnInit, OnDestroy {

  private alive = true;
  public currencyFromXml;
  public currencyFromJson;

  constructor(
    private currentRateService: CurrentRateService,
    ) { }

  ngOnInit(): void {
    this.getCurRate();
  }

  getCurRate() {
    this.currentRateService.getCurrentRateFromXml()
      .pipe(takeWhile(() => this.alive))
      .subscribe(resp => {
        this.currencyFromXml = resp;
        console.log(this.currencyFromXml)
      }, () => {
        this.currentRateService.getCurrentRateFromJson()
          .pipe(takeWhile(() => this.alive))
          .subscribe(resp => {
            this.currencyFromJson = resp;
            console.log(this.currencyFromJson)
          })
      })
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
