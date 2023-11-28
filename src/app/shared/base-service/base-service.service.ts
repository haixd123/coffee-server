import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppConfigService} from '../../../app-config.service';

@Injectable()
export class BaseService {

  constructor(
    public httpClient: HttpClient,
    protected configService: AppConfigService
  ) {
  }

  // post(url: string, data: any, params?: {}, responseType?: string, partnerUrl?: boolean): Observable<any> {
  //   switch (responseType) {
  //     case 'text':
  //       return this.httpClient.post((partnerUrl ? this.configService.getConfig().api.partnerUrl : this.configService.getConfig().api.baseUrl) + url, data, {
  //         headers: this.createHeaders().set('skipLoading', 'true') || {},
  //         responseType: 'text',
  //         params
  //       });
  //     case 'blob':
  //       return this.httpClient.post((partnerUrl ? this.configService.getConfig().api.partnerUrl : this.configService.getConfig().api.baseUrl) + url, data, {
  //         headers: this.createHeaders().set('skipLoading', 'true') || {},
  //         responseType: 'blob',
  //         params
  //       });
  //
  //     default:
  //       return this.httpClient.post((partnerUrl ? this.configService.getConfig().api.baseUrl : this.configService.getConfig().api.baseUrl) + url, data, {
  //         headers: this.createHeaders().set('skipLoading ', 'true') || {},
  //         params
  //       });
  //   }
  // }


  post(url: string, data: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api' + url, data, {
      headers: this.createHeaders().set('skipLoading', 'true') || {},
    });
  }

  public createHeaders() {
    return new HttpHeaders().set('Authorization', this.getToken() ? 'Bearer ' + this.getToken() : '');
  }
  private getToken() {
    return localStorage.getItem('accessToken');
  }
}
