import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../../services/notification.service';
import {NzMessageService, NzUploadChangeParam, NzUploadFile} from 'ng-zorro-antd';
import {ImgUploadService} from '../../../../services/img-upload.servive';




const bucketName = 'YOUR_BUCKET_NAME';


@Component({
  selector: 'app-add-user',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddUserComponent implements OnInit {
  @Input() isAdd: boolean;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();


  title;
  type = 'image/png,image/jpeg,image/gif,image/bmp';
  formAdd: FormGroup;

  image: any;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
    private imgUploadService: ImgUploadService,
    private msg: NzMessageService
  ) {
    this.formAdd = this.fb.group({
      userName: null,
      passWord: null,
      email: null,
      firstName: null,
      lastName: null,
      address: null,
      age: null,
      role: null,
      phoneNumber: null,
      dateOfBirth: null,
      sex: null,
      createDate: null,
      status: null,
      image: null,
      data: null
    });
  }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isAdd = true;
  }


  handleOk(): void {
    this.formAdd.get('image').setValue(this.image);
    this.http.post('http://localhost:8080/api/user/create', this.formAdd.value).toPromise().then((data: any) => {
      console.log('data: ', data);
      if (data.errorCode == '00') {
        this.notificationService.showMessage('success', 'Thêm mới tài khoản thành công');
        this.isAdd = false;
        this.handleCancel(true);
        this.formAdd.reset();
      } else {
        this.notificationService.showMessage('error', 'Thêm mới tài khoản thất bại');
        this.isAdd = false;
        this.handleCancel(true);
        this.formAdd.reset();
      }
    });
  }

  handleCancel(value): void {
    console.log('Button cancel clicked!');
    this.isAdd = false;
    this.closePopup.emit(value);
  }

}
