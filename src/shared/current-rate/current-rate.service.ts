import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parse } from "fast-xml-parser";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CurrentRateService {

  constructor(private http: HttpClient) {
  }

  getCurrentRateFromXml() {
    const url: string = 'https://www.cbr-xml-daily.ru/daily_utf8.xml';

    return this.http.get('https://cors-anywhere.herokuapp.com/' + url, {responseType: 'text'})
      .pipe(map(resp => parse(resp)))
      .toPromise()
  }

  getCurrentRateFromJson() {
    const url: string = 'https://www.cbr-xml-daily.ru/daily_json.js';

    return this.http.get('https://cors-anywhere.herokuapp.com/' + url).toPromise();
  }
}
