import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {ApiService} from '../../../services/api.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userName = '';
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  loading = false;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit(): void {
  }


  onSubmit(): void {
    this.errorMessage = '';
    if (this.password && this.email && this.confirmPassword && this.userName && this.name) {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords need to match';
      }
      if (!this.password || !this.email || !this.confirmPassword || !this.userName || !this.name) {
        alert('Hãy bổ sung thông tin còn thiếu!');
      } else {
        this.loading = true;
        this.auth
          .register({
            email: this.email,
            password: this.password,
            userName: this.userName,
            name: this.name,
            image: 'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg',
          })
          .subscribe(
            (res) => {
              if (res.errorCode == '00') {
                this.notificationService.showMessage('success', 'Tạo tài khoản thành công');
                this.loading = false;
                this.router.navigate(['/auth/login']);
              } else {
                this.notificationService.showMessage('error', 'Tài khoản đã tồn tại');
                this.loading = false;
              }
            },
            (err) => {
              this.errorMessage = err.error.message;
              this.loading = false;
            }
          );
      }
    } else {
      this.errorMessage = 'Make sure to fill everything ;)';
    }
  }

  canSubmit(): boolean {
    return (
      this.email &&
      this.password &&
      this.confirmPassword &&
      this.userName &&
      this.name
    )
      ? true
      : false;
  }
}
