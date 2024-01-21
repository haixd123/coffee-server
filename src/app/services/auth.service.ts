import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private api: ApiService, private token: TokenStorageService) {
    this.userSubject = new BehaviorSubject<any>(this.token.getUser());
    this.user = this.userSubject.asObservable();
  }

  getUser() {
    return this.userSubject.value;
  }

  login(credentials: any): Observable<any> {
    return this.api
      .postTypeRequest('authors/login', {
        userName: credentials.email,
        passWord: credentials.password,
      })
      .pipe(
        map((res: any) => {
          this.token.setToken(res.token);
          this.token.setUser(res.user);
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('accessToken', res.accessToken);
          // localStorage.setItem('refreshToken', JSON.stringify(res.refreshToken));

          this.userSubject.next(res.user);
          return res.user;
        })
      );
  }

  register(user: any): Observable<any> {
    return this.api.postTypeRequest('authors/register', {
      email: user.email,
      passWord: user.password,
      userName: user.userName,
      name: user.name,
      image: 'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'
    });
  }


  logout() {
    this.token.clearStorage();
    this.userSubject.next(null);
  }







}
