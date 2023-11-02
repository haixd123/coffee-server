import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-edit-posts',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditPostsComponent implements OnInit, OnChanges {
  @Input() isEdit: boolean;
  @Input() dataEdit: any;
  @Input() disable: boolean;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();

  public Editor = ClassicEditor;


  formEdit: FormGroup;
  isVisible = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
  ) {
    this.formEdit = this.fb.group({
      id: null,
      title: null,
      status: null,
      // imagePath: null,
      contentPost: null,
      contentDetail: null
    });
  }

  ngOnChanges() {
    // if (this.isEdit) {
    //     this.formEdit.reset();
    // }
    console.log('this.dataEdit1: ', this.dataEdit);
    this.formEdit.patchValue({
      id: this.dataEdit.id,
      title: this.dataEdit.title,
      status: this.dataEdit.status,
      // imagePath: this.dataEdit.imagePath,
      contentPost: this.dataEdit.contentPost,
      contentDetail: this.dataEdit.contentDetail
    });
  }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isEdit = true;
  }

  handleOk(): void {
    this.http.post('http://localhost:8080/api/posts/update', this.formEdit.value).toPromise().then((data: any) => {
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

    console.log('Button ok clicked!');
    this.handleCancel(true);

    this.isEdit = false;
    console.log('handle ok from edit');

  }

  handleCancel(value: any): void {
    console.log('Button cancel clicked!');
    console.log('handle ok from handleCancel');
    this.closePopup.emit(value);

    this.isEdit = false;
  }

}
