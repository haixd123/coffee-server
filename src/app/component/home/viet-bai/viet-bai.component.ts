import {Component, Input, OnChanges, OnInit} from '@angular/core';
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
import {Router} from "@angular/router";

@Component({
  selector: 'app-viet-bai',
  templateUrl: './viet-bai.component.html',
  styleUrls: ['./viet-bai.component.scss']
})
export class VietBaiComponent implements OnInit {
  @Input() isReset = false;
  // @Input() dataEdit: any;
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
    private router: Router,
  ) {
    this.formAdd = this.fb.group({
      id: null,
      title: [null, [Validators.required]],
      contentPost: [null, [Validators.required]],
      contentDetail: [null, [Validators.required]],
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
    console.log('this.dataEdit: ', this.dataEdit)
    if (this.dataEdit != null) {
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

  ngOnChanges() {
    this.formAdd.reset();
  }

  ngOnInit(): void {


    // this.subscription = this.shareDataService.isResetFormCreatePost$.subscribe(data => {
    //   this.formAdd.reset();
    //   this.dataEdit = null;
    // });
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
      if (this.dataEdit == null || !this.dataEdit) {
        setTimeout(() => {
          this.formAdd.get('userId').setValue(JSON.parse(localStorage.getItem('user')).id);
          this.formAdd.get('imagePath').setValue(this.urlImage);
          this.api.createPosts(this.formAdd.value).toPromise().then((data: any) => {
            if (data.errorCode == '00') {
              this.notificationService.showMessage('success', 'Đăng bài thành công');
              this.router.navigate(['/home/posts']);
              this.urlImage = null
              this.formAdd.reset();
            } else {
              this.notificationService.showMessage('error', 'Đăng bài thất bại');
            }
          });
        });
      }

      if (this.dataEdit != null) {
        this.formAdd.get('imagePath').setValue(this.urlImage ? this.urlImage : this.dataEdit.imagePath);
        // this.formAdd.get('imagePath').setValue(this.dataEdit.imagePath);
        this.api.updatePosts(this.formAdd.value).toPromise().then((data: any) => {
          if (data.errorCode == '00') {
            this.notificationService.showMessage('success', 'Sửa bài đăng thành công');
            this.router.navigate(['/home/posts']);
            this.formAdd.reset();
            this.dataEdit = null;
            this.urlImage = null
          } else {
            this.notificationService.showMessage('error', 'Sửa bài đăng thất bại');
          }
        });
      }
    }
  }
}
