import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    // private _auth: AuthService,
    private auth: AuthService,
    private router: Router,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Make sure to fill everything ;)';
      this.loading = false;
    } else {
      this.auth
        // this._auth
        .login({email: this.email, password: this.password})
        .subscribe(
          (res) => {
            if (!!res) {
              this.notificationService.showMessage('success', 'Đăng nhập thành công');
              this.loading = false;
              //???
              // if (res.role != 'ADMIN') {
              this.router.navigate(['/home/posts']);
              // } else {
              //   this.router.navigate(['/admin']);
              // }
            } else {
              this.loading = false;
              this.notificationService.showMessage('error', 'Tài khoản hoặc mật khẩu không chính xác');
            }
          },
          (err) => {
            console.log(err);
            this.loading = false;
            this.notificationService.showMessage('error', 'Tài khoản hoặc mật khẩu không chính xác');
          }
        );
    }
  }

  canSubmit(): boolean {
    return this.email.length > 0 && this.password.length > 0;
  }
}
