import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
// import {Api} from '../../api.service';
import {HttpClient} from '@angular/common/http';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {NotificationService} from '../../../../services/notification.service';


@Component({
  selector: 'app-add-posts',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddPostsComponent implements OnInit {
  @Input() isAdd: boolean;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();

  formAdd: FormGroup;
  public Editor = ClassicEditor;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
  ) {
    this.formAdd = this.fb.group({
      title: null,
      contentPost: null,
      contentDetail: null
    });
  }

  ngOnInit(): void {
  }


  showModal(): void {
    this.isAdd = true;
  }

  handleOk(): void {
    // if (this.formAdd.valid) {
    //     this.api.createPosts(this.formAdd.value);
    // }
    this.http.post('http://localhost:8080/api/posts/create', this.formAdd.value).toPromise().then((data: any) => {
      console.log('data: ', data);
      if (data.errorCode == '00') {
        this.notificationService.showMessage('success', 'Thêm mới bài đăng thành công');
        this.handleCancel(true);
      } else {
        this.notificationService.showMessage('error', 'Thêm mới bài đăng thất bại');
        this.handleCancel(true);
      }
    });
    this.isAdd = false;
    this.formAdd.reset();
    // console.log('Button ok clicked!');
    // this.isAdd = false;
    // this.handleCancel(true);

  }

  handleCancel(value): void {
    console.log('Button cancel clicked!');
    this.isAdd = false;
    this.closePopup.emit(value);
  }
}
