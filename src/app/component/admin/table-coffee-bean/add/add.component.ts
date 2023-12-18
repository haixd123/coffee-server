import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EditCoffeeBeanComponent} from '../edit/edit.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../../services/notification.service';
import {NzUploadChangeParam} from 'ng-zorro-antd';
import {finalize, switchMap} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {Api} from '../../../../services/api';


@Component({
  selector: 'app-add-coffee-bean',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddCoffeeBeanComponent implements OnInit {
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
      contentCoffee: null
    });
  }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isAdd = true;
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const key in this.formAdd.controls) {
      this.formAdd.controls[key].markAsDirty();
      this.formAdd.controls[key].updateValueAndValidity();
    }
  }

  onUpload(info: NzUploadChangeParam) {
    this.isLoading = true;
    this.selectedFile = info.file.originFileObj;
    const uploadImageData = new FormData();
    uploadImageData.append('files', this.selectedFile, this.selectedFile.name);
    const filePath = `'/image' + '/' + ${Math.random()} + '/' + ${this.selectedFile.name}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedFile).snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe((url) => {
        this.isLoading = false;
        this.urlImage = url;
      });
    })).subscribe();
  }

  async handleOk() {
    if (this.formAdd.valid) {
      this.formAdd.get('image').setValue(this.urlImage);
      await this.api.createCoffeeBean(this.formAdd.value).toPromise().then((data: any) => {
        if (data.errorCode == '00') {
          this.notificationService.showMessage('success', 'Thêm loại cafe mới thành công');
          this.handleCancel(true);
          this.isAdd = false;
          this.formAdd.reset();
        } else {
          this.notificationService.showMessage('error', 'Tên loại cà phê đã tồn tại');
        }
      });

    }
  }

  handleCancel(value): void {
    this.isAdd = false;
    this.closePopup.emit(value);
  }

  get f() {
    return this.formAdd.controls;
  }
}
