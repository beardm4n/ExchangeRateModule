import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrentRateService } from '../current-rate.service';
import { takeWhile } from "rxjs/operators";
import { timer } from "rxjs";

import { RateJson, RateXml } from "../models";

@Component({
  selector: 'app-current-rate',
  templateUrl: './current-rate.component.html',
  styleUrls: ['./current-rate.component.scss']
})
export class CurrentRateComponent implements OnInit, OnDestroy {

  private alive = true;
  public rateFromXml: RateXml[];
  public rateFromJson: RateJson;
  public today: string;

  constructor(
    private currentRateService: CurrentRateService,
  ) { }

  async ngOnInit() {
    await this.getCurrentRate();
  }

  getCurrentRate(): void {
    timer(0, 10000)
      .pipe(takeWhile(() => this.alive))
      .subscribe(async () => {
        await this.currentRateService.getCurrentRateFromXml()
          .then(res => {
            this.getDate();
            this.rateFromXml = res.ValCurs.Valute.filter(el => el.CharCode === 'EUR');
            const valueUpdate = this.rateFromXml[0].Value.replace(',', '.');
            this.rateFromXml[0].Value = this.rounded((parseFloat(valueUpdate))).replace('.', ',');
          })
          .catch(async () => {
            await this.currentRateService.getCurrentRateFromJson()
              .then(res => {
                this.getDate();
                // @ts-ignore
                const resp = res.Valute.EUR;
                const roundedNumber = this.rounded(resp.Value).replace('.', ',');
                this.rateFromJson = {
                  ID: resp.ID,
                  NumCode: resp.NumCode,
                  CharCode: resp.CharCode,
                  Nominal: resp.Nominal,
                  Name: resp.Name,
                  Value: roundedNumber,
                  Previous: resp.Previous
                }
                this.checkRates();
              })
          })
      })
  }

  /**
   * Method for check results: if both request have a data we take the first result
   */
  checkRates(): void {
    if (this.rateFromXml && this.rateFromJson) {
      this.rateFromJson = null;
    }
  }

  getDate(): void {
    this.today = new Date().toLocaleDateString('ru-RU', {
      hour12: false,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      month: 'short',
      day: 'numeric',
    })
  }

  rounded(n: number): string {
    return n.toFixed(2);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
