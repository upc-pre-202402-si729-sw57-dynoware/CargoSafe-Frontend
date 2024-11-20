import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {StatisticsEntity} from "../model/statistics.entity";
import {catchError, Observable, retry} from "rxjs";

/**
 * Chart1
 * @interface
 * This interface is used to represent the chart1
 */

export interface Chart1 {
  labels: string[];
  orders: number[];
}

/**
 * Chart2
 * @interface
 * This interface is used to represent the chart2
 */

export interface Chart2 {
  labels: string[];
  deliveries: number[];
}

/**
 * Chart3
 * @interface
 * This interface is used to represent the chart3
 */

export interface Chart3 {
  labels: string[];
  cargo: number[];
}

/**
 * Data
 * @interface
 * This interface is used to represent the data
 */

export interface Data {
  chart1: Chart1;
  chart2: Chart2;
  chart3: Chart3;
}

/**
 * Statistics response
 * @interface
 * This interface is used to represent the statistics response
 */

export interface StatisticsResponse {
  data: Data;
}


@Injectable({
  providedIn: 'root',
})
export class StadisticsService extends BaseService<StatisticsEntity> {
  constructor() {
    super();
    this.resourceEndpoint = '/data_statistics';
  }


  public getStatisticsData(): Observable<StatisticsResponse[]> {
    return this.http.get<StatisticsResponse[]>(this.resourcePath(), this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
