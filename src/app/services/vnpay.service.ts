import {Injectable} from '@angular/core';
import {IdService} from './id.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppConfigService} from '../../app-config.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VnpayService {
  listQuantity: number[] = [0];

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  private getFullUrl(endpoint: string): string {
    return `http://localhost:8080/${endpoint}`;
  }

  getPayment(price: number, id: number): Observable<string> {
    const params = new HttpParams()
      .set('price', price.toString())
      .set('contractId', id.toString());
    return this.http.get(this.getFullUrl('api/v1/pay'), {
      params,
      responseType: 'text',
    });
  }

  getPaymentService(price: number, id: number): Observable<string> {
    const params = new HttpParams()
      .set('price', price.toString())
      .set('registerServiceId', id.toString());
    return this.http.get(this.getFullUrl('api/v1/pay-service'), {
      params,
      responseType: 'text',
    });
  }
}
