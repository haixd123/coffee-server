import {Component, OnInit} from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NzUploadChangeParam} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-viet-bai',
  templateUrl: './viet-bai.component.html',
  styleUrls: ['./viet-bai.component.scss']
})
export class VietBaiComponent implements OnInit {
  public Editor = ClassicEditor;

  selectedFile: File;
  urlImage: string;

  formAdd: FormGroup;

  // @ts-ignore

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
    private storage: AngularFireStorage,
  ) {
    this.formAdd = this.fb.group({
      title: null,
      contentPost: null,
      contentDetail: null,
      imagePath: null,
      userId: null,
      hashTag: null,
    });
  }

  ngOnInit(): void {
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

  Submit() {
    setTimeout(() => {
      this.formAdd.get('userId').setValue(JSON.parse(localStorage.getItem('user')).id);
      this.formAdd.get('imagePath').setValue(this.urlImage);
      this.http.post('http://localhost:8080/api/posts/create', this.formAdd.value).toPromise().then((data: any) => {
        if (data.errorCode == '00') {
          this.notificationService.showMessage('success', 'Đăng bài thành công');
          this.formAdd.reset();
        } else {
          this.notificationService.showMessage('error', 'Đăng bài thất bại');
        }
      });
    });
  }
}
