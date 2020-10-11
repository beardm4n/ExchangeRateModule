import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrentRateService } from '../current-rate.service';
import { takeWhile } from "rxjs/operators";
import { timer } from "rxjs";

@Component({
  selector: 'app-current-rate',
  templateUrl: './current-rate.component.html',
  styleUrls: ['./current-rate.component.scss']
})
export class CurrentRateComponent implements OnInit, OnDestroy {

  private alive = true;
  public rateFromXml;
  public rateFromJson;

  constructor(
    private currentRateService: CurrentRateService,
    ) { }

  async ngOnInit() {
    await this.getCurrentRate();
  }

  getCurrentRate() {
    timer(0, 10000)
      .pipe(takeWhile(() => this.alive))
      .subscribe(async () => {
        await this.currentRateService.getCurrentRateFromXml()
          .then(res => this.rateFromXml = res)
          .catch(async () => {
            await this.currentRateService.getCurrentRateFromJson()
              .then(res => this.rateFromJson = res)
          })
      })
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
