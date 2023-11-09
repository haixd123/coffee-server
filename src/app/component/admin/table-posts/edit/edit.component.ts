import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../../services/notification.service';
import {NzUploadChangeParam} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {DatePipe} from '@angular/common';

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

  selectedFile: File;
  urlImage: string;
  dateCreatedAt: string;

  formEdit: FormGroup;
  isVisible = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
    private storage: AngularFireStorage,
    public datePipe: DatePipe,
  ) {
    this.formEdit = this.fb.group({
      id: null,
      title: null,
      status: null,
      imagePath: null,
      contentPost: null,
      contentDetail: null,
      createdAt: null,
      createdAtCur: null,
      updatedAt: null,
    });
  }

  ngOnChanges() {
    // if (this.isEdit) {
    //     this.formEdit.reset();
    // }
    this.formEdit.patchValue({
      id: this.dataEdit.id,
      title: this.dataEdit.title,
      status: this.dataEdit.status,
      imagePath: this.dataEdit.imagePath,
      contentPost: this.dataEdit.contentPost,
      contentDetail: this.dataEdit.contentDetail,
      createdAt: this.dataEdit.createdAt,
    });
  }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isEdit = true;
  }

  onUpload(info: NzUploadChangeParam) {
    this.selectedFile = info.file.originFileObj;
    const uploadImageData = new FormData();
    uploadImageData.append('files', this.selectedFile, this.selectedFile.name);
    const filePath = `'/image' + '/' + ${Math.random()} + '/' + ${this.selectedFile.name}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.urlImage = url;
        });
      })
    ).subscribe();
    // .subscribe((res) => {
    //     if (res.status === 200) {
    //       console.log('success | res : ', res);
    //     } else {
    //       console.log('failed');
    //     }
    //   }
    // );
  }

  handleOk(): void {
    this.formEdit.get('imagePath').setValue(this.dataEdit.imagePath);
    this.formEdit.get('createdAt').setValue(this.datePipe.transform(this.dataEdit.createdAt, 'dd/mm/yyyy'));
    this.http.post('http://localhost:8080/api/posts/update', this.formEdit.value).toPromise().then((data: any) => {
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

    this.handleCancel(true);

    this.isEdit = false;

  }

  handleCancel(value: any): void {
    this.closePopup.emit(value);

    this.isEdit = false;
  }

}
