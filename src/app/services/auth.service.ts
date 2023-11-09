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

  constructor(private _api: ApiService, private _token: TokenStorageService) {
    this.userSubject = new BehaviorSubject<any>(this._token.getUser());
    this.user = this.userSubject.asObservable();
  }

  getUser() {
    return this.userSubject.value;
  }

  login(credentials: any): Observable<any> {
    return this._api
      .postTypeRequest('authors/login', {
        userName: credentials.email,
        passWord: credentials.password,
      })
      .pipe(
        map((res: any) => {


          this._token.setToken(res.token);
          this._token.setUser(res.user);
          localStorage.setItem("user", JSON.stringify(res.user));
          localStorage.setItem("token", JSON.stringify(res.token));

          console.log(res);
          this.userSubject.next(res.user);
          return res.user;
        })
      );
  }

  register(user: any): Observable<any> {
    return this._api.postTypeRequest('authors/register', {
      email: user.email,
      passWord: user.password,
      userName: user.userName,
      name: user.name,
    });
  }

  logout() {
    this._token.clearStorage();
    this.userSubject.next(null);
  }
}
