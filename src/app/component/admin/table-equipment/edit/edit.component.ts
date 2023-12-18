import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzUploadChangeParam} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../../services/notification.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Api} from '../../../../services/api';

@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnChanges {
  @Input() isEdit: boolean;
  @Input() dataEdit: any;
  @Input() disable: boolean;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();

  public Editor = ClassicEditor;
  selectedFile: File;
  urlImage: string;

  formEdit: FormGroup;
  isLoading = false;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
    private storage: AngularFireStorage,
    private api: Api,
  ) {
    this.formEdit = this.fb.group({
      id: null,
      name: [null, [Validators.required]],
      title: null,
      status: null,
      image: null,
      contentEquipment: null
    });
  }

  ngOnChanges() {
    if (this.dataEdit) {
      this.formEdit.reset();
      this.formEdit.patchValue({
        id: this.dataEdit.id,
        name: this.dataEdit.name,
        title: this.dataEdit.title,
        status: this.dataEdit.status,
        image: this.dataEdit.image,
        contentEquipment: this.dataEdit.contentEquipment,
      });
      this.urlImage = this.dataEdit.image;
    }
  }

  get f() {
    return this.formEdit.controls;
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const key in this.formEdit.controls) {
      this.formEdit.controls[key].markAsDirty();
      this.formEdit.controls[key].updateValueAndValidity();
    }
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

  showModal(): void {
    this.isEdit = true;
  }

  handleOk(): void {
    this.formEdit.get('image').setValue(this.urlImage);

    this.api.updateEquipment(this.formEdit.value).toPromise().then((data: any) => {
      if (data.errorCode == '00') {
        this.notificationService.showMessage('success', 'Sửa Loại trang thiết bị thành công');
        this.handleCancel(true);
        this.isEdit = false;
        this.formEdit.reset();
      } else {
        this.notificationService.showMessage('error', 'Loại trang thiết bị đẫ tồn tại');
        // this.handleCancel(true);
      }
    });
  }

  handleCancel(value: any): void {
    this.isEdit = false;
    this.closePopup.emit(value);
  }
}
