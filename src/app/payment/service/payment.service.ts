import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {PaymentEntity} from "../model/payment.entity";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

/**
 * Payment Service
 * This class is in charge of managing the payment service
 * @class
 */

export class PaymentService  extends BaseService<PaymentEntity> {

  constructor( http: HttpClient) {
    super();
    this.resourceEndpoint = '/payments';
  }

  /**
   * Process Payment
   * @param payment
   * @returns Observable
   * This method is in charge of processing the payment
   */

  processPayment(payment: PaymentEntity): Observable<any> {
    return this.http.post<any>(this.resourcePath(), payment, this.httOptions)
      .pipe(catchError(this.handleError));
  }
}
