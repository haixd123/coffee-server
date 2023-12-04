import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {HttpClient} from '@angular/common/http';
import {NzUploadChangeParam} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';
import {NotificationService} from '../../../../services/notification.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Api} from '../../../../services/api';


@Component({
  selector: 'app-add-equipment',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  formAdd: FormGroup;
  @Input() isAdd: boolean;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();

  public Editor = ClassicEditor;

  selectedFile: File;
  urlImage: string;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
    private storage: AngularFireStorage,
    private api: Api,

  ) {
    this.formAdd = this.fb.group({
      name: [null, [Validators.required]],
      title: null,
      image: null,
      contentEquipment: null
    });
  }
  get f() {
    return this.formAdd.controls;
  }

  ngOnInit(): void {
  }


  showModal(): void {
    this.isAdd = true;
  }

  onUpload(info: NzUploadChangeParam) {
    this.isLoading = true;
    this.selectedFile = info.file.originFileObj;
    const uploadImageData = new FormData();
    uploadImageData.append('files', this.selectedFile, this.selectedFile.name);
    const filePath = `'/image' + '/' + ${Math.random()} + '/' + ${this.selectedFile.name}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.isLoading = false;
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
      this.formAdd.get('image').setValue(this.urlImage);
      this.api.createEquipment(this.formAdd.value).toPromise().then((data: any) => {
        if (data.errorCode == '00') {
          this.notificationService.showMessage('success', 'Thêm loại cafe mới thành công');
          this.handleCancel(true);
        } else {
          this.notificationService.showMessage('error', 'Thêm loại cafe mới thất bại');
          this.handleCancel(true);
        }
      });
      this.handleCancel(true);
      this.isAdd = false;
      this.formAdd.reset();
    }, 2000);
  }

  handleCancel(value): void {
    this.isAdd = false;
    this.closePopup.emit(value);
  }
}
