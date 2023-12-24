import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    if (!expectedRole) {
      return false; // Cho phép truy cập nếu không có yêu cầu vai trò cụ thể
    }

    // if (expectedRole >= 1) {
    //   console.log('expectedRole - if: ', expectedRole);
    //
    //   return true; // Cho phép truy cập nếu không có yêu cầu vai trò cụ thể
    // }

    const userRole = this.userService.getUserRole();

    if (userRole && userRole == expectedRole) {
      return true; // Cho phép truy cập nếu người dùng có vai trò phù hợp
    }

    // if (!userRole && expectedRole == -1) {
    //   console.log('userRole: ', userRole);
    //   this.router.navigate(['/auth/login']);
    //   return true;
    // }

    // Người dùng không có quyền, chuyển hướng đến trang không có quyền truy cập
    this.router.navigate(['/unauthorized']);
    return false;


  }

}
