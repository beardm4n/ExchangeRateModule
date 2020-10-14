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
    return this.http.get('/daily_utf8.xml', {responseType: 'text'})
      .pipe(map(resp => parse(resp)))
      .toPromise()
  }

  getCurrentRateFromJson() {
    return this.http.get('daily_json.js').toPromise();
  }
}
