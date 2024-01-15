import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../../services/notification.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Api} from '../../../../services/api';
import {NzUploadChangeParam} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditProductComponent implements OnInit, OnChanges {
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
      description: null,
      sku: [null, [Validators.required]],
      price: null,
      category: null,
      categoryCur: null,
      // categoryCur: [null, [Validators.required]],
      discount: null,
      remaining: null,
      image: null,
      detail: null,
    });
  }

  ngOnChanges() {
    this.formEdit.get('name').setValue('')
    this.formEdit.reset();
    if (this.dataEdit) {
      // console.log('a= ', this.dataEdit.category.split(' '))
      // this.formEdit.get('categoryCur').setValue([this.dataEdit.category])
      // this.formEdit.reset();
      this.formEdit.patchValue({
        id: this.dataEdit.id,
        name: this.dataEdit.name,
        description: this.dataEdit.description,
        sku: this.dataEdit.sku,
        price: this.dataEdit.price,
        categoryCur: this.dataEdit.category,
        // categoryCur: [this.dataEdit.category],
        discount: this.dataEdit.discount,
        remaining: this.dataEdit.remaining,
        image: this.dataEdit.image,
        detail: this.dataEdit.detail,
      });
      this.urlImage = this.dataEdit.image;
    }
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

  showModal(): void {
    this.isEdit = true;
  }

  get f() {
    return this.formEdit.controls;
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
    // this.formEdit.get('id').setValue(this.dataEdit.id);
    this.formEdit.get('image').setValue(this.urlImage);
    this.formEdit.get('category').setValue(this.formEdit.get('categoryCur')?.value.toString())
    this.api.updateProduct(this.formEdit.value).subscribe((data: any) => {
      if (data.errorCode == '00') {
        this.notificationService.showMessage('success', 'Cập nhật sản phẩm thành công');
        this.handleCancel(true);
        this.isEdit = false;
        this.formEdit.reset();
      } else {
        this.notificationService.showMessage('error', 'Cập nhật sản phẩm thất bại');
        // this.handleCancel(true);
      }
    });
  }

  handleCancel(value: any): void {
    this.isEdit = false;
    this.formEdit.reset();
    this.closePopup.emit(value);
  }
}
