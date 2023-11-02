import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

// import {BaseService} from './base-service.service';


@Injectable({
  providedIn: 'root'
})
// export class ImgUploadService extends BaseService {
export class ImgUploadService {
  constructor(
    private http: HttpClient,
  ) {
  }

  imgUpload(url: string, formData: FormData): Observable<any> {
    return this.http.post(url, formData);
  }
}
