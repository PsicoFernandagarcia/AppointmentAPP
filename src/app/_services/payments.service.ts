import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Payment, PaymentInformation } from '../_models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  save(payment:Payment):Observable<Payment>{
    return this.http.post<Payment>('/payments',payment);
  }
  edit(payment:Payment):Observable<Payment>{
    return this.http.put<Payment>('/payments',payment);
  }

  getLatestPayments():Observable<Payment[]>{
    return this.http.get<Payment[]>('/payments/latest')
      .pipe( 
        map (response =>{
          response.forEach(p => {
            p.paidAt = new Date(p.paidAt);
          });
          return response;
        })
      );
  }

  getPayments(patientId:number, hostId:number, count:number):Observable<Payment[]>{
    const options =   {
      params: new HttpParams().set('hostId',hostId)
                              .set('patientId',patientId)
                              .set('count',count)
    };
    return this.http.get<Payment[]>('/payments',options)
      .pipe( 
        map (response =>{
          response.forEach(p => {
            p.paidAt = new Date(p.paidAt);
          });
          return response;
        })
      );
  }

  getPaymentInformation(year:number, hostId:number):Observable<PaymentInformation[]>{
    const options =   {
      params: new HttpParams().set('hostId',hostId)
                              .set('year',year)
    };
    return this.http.get<PaymentInformation[]>('/payments/report',options);
  }
}
