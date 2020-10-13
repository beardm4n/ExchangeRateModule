import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrentRateService } from '../current-rate.service';
import { takeWhile } from "rxjs/operators";
import { timer } from "rxjs";
import { formatDate } from '@angular/common';

import {RateJson, RateXml} from "../models";

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
            this.today = formatDate(new Date(), 'd MMM h:mm:ss a', 'en');
            this.rateFromXml = res.ValCurs.Valute.filter(el => el.CharCode === 'EUR');
            const valueUpdate = this.rateFromXml[0].Value.replace(',', '.');
            this.rateFromXml[0].Value = (Math.ceil(parseFloat(valueUpdate) * 100) / 100).toString().replace('.', ',');
          })
          .catch(async () => {
            await this.currentRateService.getCurrentRateFromJson()
              .then(res => {
                this.today = formatDate(new Date(), 'd MMM h:mm:ss a', 'en');
                // @ts-ignore
                const resp = res.Valute.EUR;
                const roundingNumberToString = (Math.ceil(resp.Value * 100) / 100).toString().replace('.', ',');
                this.rateFromJson = {
                  ID: resp.ID,
                  NumCode: resp.NumCode,
                  CharCode: resp.CharCode,
                  Nominal: resp.Nominal,
                  Name: resp.Name,
                  Value: roundingNumberToString,
                  Previous: resp.Previous
                }
              })
          })
      })
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
