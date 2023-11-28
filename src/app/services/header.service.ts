import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions'; // Địa chỉ của Spring Boot API

  constructor(private http: HttpClient) { }

  getDataWithHeader(): Observable<any> {
    // Thêm header vào yêu cầu HTTP
    const headers = new HttpHeaders({
      Authorization: 'Bearer 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', // Thêm header cần thiết
      'Custom-Header': 'Custom-Value'
    });

    return this.http.get<any>(`${this.apiUrl}/endpoint`, { headers });
  }
}
