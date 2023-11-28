import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserRole(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.role : null;
  }
}
