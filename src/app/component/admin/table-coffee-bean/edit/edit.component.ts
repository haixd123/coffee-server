import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../../services/notification.service';
import {NzUploadChangeParam} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-edit-coffee-bean',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditCoffeeBeanComponent implements OnInit, OnChanges {
  @Input() isEdit: boolean;
  @Input() dataEdit: any;
  @Input() disable: boolean;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();

  public Editor = ClassicEditor;

  selectedFile: File;
  urlImage: string;

  formEdit: FormGroup;
  srcImg: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
    private storage: AngularFireStorage,
  ) {
    this.formEdit = this.fb.group({
      id: null,
      name: null,
      title: null,
      status: null,
      image: null,
      contentCoffee: null
    });
  }


  ngOnChanges() {
    // if (this.isEdit) {
    //     this.formEdit.reset();
    // }
    this.formEdit.patchValue({
      id: this.dataEdit.id,
      name: this.dataEdit.name,
      title: this.dataEdit.title,
      status: this.dataEdit.status,
      image: this.dataEdit.image,
      contentCoffee: this.dataEdit.contentCoffee,
    });
    console.log('this.dataEdit: ', this.dataEdit);
    this.urlImage = this.dataEdit.image;
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
    this.formEdit.get('image').setValue(this.urlImage);

    this.http.post('http://localhost:8080/api/coffee/update', this.formEdit.value).toPromise().then((data: any) => {
      if (data.errorCode == '00') {
        this.notificationService.showMessage('success', 'Sửa bài đăng thành công');
        this.handleCancel(true);
      } else {
        this.notificationService.showMessage('error', 'Sửa bài đăng thất bại');
        this.handleCancel(true);
      }
      this.isEdit = false;
      this.formEdit.reset();
    });
  }

  handleCancel(value: any): void {
    this.isEdit = false;
    this.closePopup.emit(value);
  }
}
