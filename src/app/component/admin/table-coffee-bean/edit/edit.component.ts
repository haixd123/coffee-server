import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../../services/notification.service';

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


  formEdit: FormGroup;
  isVisible = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
  ) {
    this.formEdit = this.fb.group({
      id: null,
      name: null,
      title: null,
      status: null,
      contentCoffee: null
    });
  }

  ngOnChanges() {
    // if (this.isEdit) {
    //     this.formEdit.reset();
    // }
    console.log('this.dataEdit | before: ', this.dataEdit);
    this.formEdit.patchValue({
      id: this.dataEdit.id,
      name: this.dataEdit.name,
      title: this.dataEdit.title,
      status: this.dataEdit.status,
      contentCoffee: this.dataEdit.contentCoffee,
    });
    console.log('this.dataEdit | after: ', this.dataEdit);
  }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isEdit = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.http.post('http://localhost:8080/api/coffee/update', this.formEdit.value).toPromise().then((data: any) => {
      console.log('data: ', data);
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
    console.log('Button cancel clicked!');
    this.isEdit = false;
    this.closePopup.emit(value);
  }
}
