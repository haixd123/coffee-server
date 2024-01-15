import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {AppConfigService} from '../../../app-config.service';
import {catchError} from "rxjs/operators";

@Injectable()
export class BaseService {

  constructor(
    public httpClient: HttpClient,
    protected configService: AppConfigService
  ) {
  }

  post(url: string, data: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api' + url, data, {
      headers: this.createHeaders().set('skipLoading', 'true') || {},
    });
  }

  export(url: string, data: any, params?: {}, responseType?: string, partnerUrl?: boolean): Observable<any> {
    switch (responseType) {
      case 'blob':
        return this.httpClient.post((partnerUrl ? this.configService.getConfig().api.partnerUrl : this.configService.getConfig().api.baseUrl) + url, data, {
          headers: this.createHeaders().set('skipLoading', 'true') || {},
          responseType: 'blob',
          params
        });

      default:
        return this.httpClient.post((partnerUrl ? this.configService.getConfig().api.baseUrl : this.configService.getConfig().api.baseUrl) + url, data, {
          headers: this.createHeaders().set('skipLoading ', 'true') || {},
          params
        });
    }
  }

  public postRequestFile(endpointUrl: string, data?: any, baseUrl?: string): Observable<any> {
    let urlPath = baseUrl != null ? baseUrl : 'http://localhost:8080/api' + endpointUrl;
    return this.httpClient.post(urlPath, data, {responseType: 'blob'}).pipe(
      catchError(this.handleError)
    );
  }

  public postRequestFile1(data?: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/authors/bill/export', data, {responseType: 'blob'}).pipe(
      catchError(this.handleError)
    );
  }

  public handleError(error: any) {
    return throwError(error.error);
  }


  public createHeaders() {
    return new HttpHeaders().set('Authorization', this.getToken() ? 'Bearer ' + this.getToken() : '');
  }

  private getToken() {
    return localStorage.getItem('accessToken');
  }
}
