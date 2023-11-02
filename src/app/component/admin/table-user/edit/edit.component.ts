import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AddUserComponent} from '../add/add.component';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditUserComponent implements OnInit, OnChanges {
  @Input() isEdit: boolean;
  @Input() dataEdit: any;
  @Input() disable: boolean;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();


  formEdit: FormGroup;
  isVisible = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,

  ) {
    this.formEdit = this.fb.group({
      id: null,
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
      status: null
    });
  }

  ngOnChanges() {
    this.formEdit.patchValue({
      id: this.dataEdit.id,
      userName: this.dataEdit.userName,
      passWord: this.dataEdit.passWord,
      email: this.dataEdit.email,
      firstName: this.dataEdit.firstName,
      lastName: this.dataEdit.lastName,
      address: this.dataEdit.address,
      age: this.dataEdit.age,
      role: this.dataEdit.role,
      phoneNumber: this.dataEdit.phoneNumber,
      dateOfBirth: this.dataEdit.dateOfBirth,
      sex: this.dataEdit.sex,
      createDate: this.dataEdit.createDate,
      status: this.dataEdit.status,
    });
  }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isEdit = true;
  }

  handleOk(): void {
    this.http.post('http://localhost:8080/api/user/update', this.formEdit.value).toPromise().then((data: any) => {
      console.log('data: ', data);
      if (data.errorCode == '00') {
        this.notificationService.showMessage('success', 'Sửa bài đăng thành công');
        this.isEdit = false;
        this.handleCancel(true);
        this.formEdit.reset();
      } else {
        this.notificationService.showMessage('error', 'Sửa bài đăng thất bại');
        this.isEdit = false;
        this.handleCancel(true);
        this.formEdit.reset();
      }
    });

  }

  handleCancel(value: any): void {
    console.log('Button cancel clicked!');
    this.isEdit = false;
    this.closePopup.emit(value);
  }
}
