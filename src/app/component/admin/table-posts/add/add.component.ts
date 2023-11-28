import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
// import {Api} from '../../api.service';
import {HttpClient} from '@angular/common/http';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {NotificationService} from '../../../../services/notification.service';
import {NzUploadChangeParam} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {DatePipe} from '@angular/common';
import {Api} from '../../../../services/api';


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

  selectedFile: File;
  urlImage: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
    private storage: AngularFireStorage,
    public datePipe: DatePipe,
    private api: Api,

  ) {
    this.formAdd = this.fb.group({
      title: null,
      contentPost: null,
      imagePath: null,
      category: 'Trang thiết bị',
      contentDetail: null,
      createAt: null,
    });
  }

  ngOnInit(): void {
  }


  showModal(): void {
    this.isAdd = true;
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
    setTimeout(() => {
      // if (this.urlImage) {
      this.formAdd.get('imagePath').setValue(this.urlImage);
      // }
      this.formAdd.get('createAt').setValue(this.datePipe.transform(new Date(), 'dd/MM/yyyy'));
      this.api.createPosts(this.formAdd.value).toPromise().then((data: any) => {
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

    }, 2000);
  }

  handleCancel(value): void {
    this.isAdd = false;
    this.closePopup.emit(value);
  }
}
