import {Component, OnChanges, OnInit} from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NzUploadChangeParam} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {NotificationService} from '../../../services/notification.service';
import {Api} from 'src/app/services/api';
import {ShareDataService} from '../../../services/share-data.service';
import {Subscription} from 'rxjs';

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
  dataEdit: any;

  subscription: Subscription;


  // @ts-ignore

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
    private storage: AngularFireStorage,
    private api: Api,
    private shareDataService: ShareDataService,
  ) {
    this.formAdd = this.fb.group({
      id: null,
      title: [null, [Validators.required]],
      contentPost: null,
      contentDetail: null,
      imagePath: null,
      userId: null,
      createdAt: null,
      category: 'Trang thiết bị',
      like1: null,
      comment: null,
      status: null,
      // hashTag: null,
    });
    this.subscription = this.shareDataService.dataEditPosts$.subscribe(data => {
      this.dataEdit = data;
    });

    if (this.dataEdit) {
      this.formAdd.patchValue({
        id: this.dataEdit.id,
        title: this.dataEdit.title,
        status: this.dataEdit.status,
        contentPost: this.dataEdit.contentPost,
        contentDetail: this.dataEdit.contentDetail,
        imagePath: this.dataEdit.imagePath,
        userId: this.dataEdit.userId,
        createdAt: this.dataEdit.createdAt,
        category: this.dataEdit.category,
        like1: this.dataEdit.like1,
        comment: this.dataEdit.comment,
      });
      this.formAdd.get('userId').setValue(this.dataEdit.userId);
      this.formAdd.get('like1').setValue(this.dataEdit.like1);
      this.formAdd.get('comment').setValue(this.dataEdit.comment);
    }
  }


  ngOnInit(): void {
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const key in this.formAdd.controls) {
      this.formAdd.controls[key].markAsDirty();
      this.formAdd.controls[key].updateValueAndValidity();
    }
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
    if (this.formAdd.get('title').value?.trim()) {
      if (!this.dataEdit) {
        setTimeout(() => {
          this.formAdd.get('userId').setValue(JSON.parse(localStorage.getItem('user')).id);
          this.formAdd.get('imagePath').setValue(this.urlImage);
          this.api.createPosts(this.formAdd.value).toPromise().then((data: any) => {
            if (data.errorCode == '00') {
              this.notificationService.showMessage('success', 'Đăng bài thành công');
              this.formAdd.reset();
            } else {
              this.notificationService.showMessage('error', 'Đăng bài thất bại');
            }
          });
        });
      }

      if (this.dataEdit) {
        this.api.updatePosts(this.formAdd.value).toPromise().then((data: any) => {
          if (data.errorCode == '00') {
            this.notificationService.showMessage('success', 'Sửa bài đăng thành công');
            this.formAdd.reset();
          } else {
            this.notificationService.showMessage('error', 'Sửa bài đăng thất bại');
          }
        });
      }
    }
  }
}
