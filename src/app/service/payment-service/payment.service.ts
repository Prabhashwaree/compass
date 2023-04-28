import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseURL=environment.baseURL+"/backOffice";

constructor(private http: HttpClient) { }

public getAllPaymentHistory(limit: number, offset: number, search: string) {
  let queryParams = new HttpParams();
  queryParams = queryParams.append('limit', limit);
  queryParams = queryParams.append('offset', offset);
  queryParams = queryParams.append('search', search);

  return this.http.get(this.baseURL + '/payment_history', { params: queryParams });
}


}
